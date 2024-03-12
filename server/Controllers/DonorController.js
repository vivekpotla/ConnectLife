import Donor from '../Models/Donor.js';
import Appointment from '../Models/Appointment.js';
import Camp from '../Models/Camp.js';
import Slot from '../Models/Slot.js';
import AwarenessPost from '../Models/NGOpost.js';
import RequestDetails from '../Models/DetailsRequest.js';
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

//donor signup
export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, aadhaarNumber, bloodGroup, address } = req.body;
    console.log(req.body);
    // Check if phoneNumber is already registered
    const existingDonor = await Donor.findOne({ phoneNumber });
    if (existingDonor) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    let imageURL = null
    let path = req.files?.image?.path
    if (path) {
      const timestamp = Date.now(); // Get current timestamp
      const public_id = `users/${name}_${timestamp}`;
      await cloudinary.uploader.upload(path, {
        public_id: public_id,
        width: 500,
        height: 300
      })
        .then((result) => {
          imageURL = result.secure_url;

        })
        .catch((error) => {
          console.log("image upload error")
          console.error(error);
        });
    }
    const hashedPassword = bcrypt.hashSync(password);
    // Create new donor
    const newDonor = await Donor.create({ name, email, password: hashedPassword, phoneNumber, bloodGroup, address, aadhaarNumber, ...(imageURL && { imageURL }) });

    res.status(200).json({ message: 'Donor registered successfully', payload: newDonor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//donor login
export const loginDonor = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Check if donor exists with provided phoneNumber
    const donor = await Donor.findOne({ phoneNumber });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    // Check if password is correct
    const isPasswordValid = bcrypt.compareSync(password, donor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Donor logged in successfully', payload: donor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//update live location 
export const updateDonorLocation = async (req, res) => {
  try {

    const { donorId, latitude, longitude } = req.body;

    // Find the donor by ID
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Update live location
    donor.livelocation = { latitude, longitude };
    await donor.save();

    res.json({ message: 'Live location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//get donor previos/current appointments
export const getDonorAppointments = async (req, res) => {
  try {
    const donorId = req.params.donorId;

    // Find all appointments for the donor and populate camp details
    const appointments = await Appointment.find({ donor: donorId }).populate('camp', 'name location');

    // Separate appointments based on donated status
    const donatedAppointments = appointments.filter(appointment => appointment.donated);
    const notDonatedAppointments = appointments.filter(appointment => !appointment.donated);

    // Send separated appointments in the response
    res.json({ donatedAppointments, notDonatedAppointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//book appointment slot
export const bookAppointment = async (req, res) => {
  try {
    const { campId, date, slot, donorId } = req.body;
    
    // Find the donor by ID
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Check if the slot is available
    const { isSlotAvailable, slotId } = await isSlotAvailableForDate(campId, date, slot);
    if (!isSlotAvailable) {
      return res.status(400).json({ message: 'Slot is not available' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      donor: donorId,
      camp: campId,
      date: new Date(date),
      slot: slotId.toString(),
      bloodGroup: donor.bloodGroup
    });

    // Decrement slotsLeft for the booked slot
    await Slot.findOneAndUpdate(
      { camp: campId, date: new Date(date), startTime: slot.startTime, endTime: slot.endTime },
      { $inc: { slotsLeft: -1 }, $push: { donors: donorId } }
    );

    // Update donor's previousAppointments
    await Donor.findByIdAndUpdate(donorId, { $push: { previousAppointments: appointment._id } });

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//search camps based on string input 
export const searchBloodDonationCamps = async (req, res) => {
  try {
    const query = req.params.query;
    const camps = await Camp.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } }, // Search by name
        { location: { $regex: new RegExp(query, 'i') } } // Search by location
      ]
    });
    res.json(camps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


Camp.collection.createIndex({ geolocation: '2dsphere' });

//search camps by location (nearest)
export const findNearestCamps = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Find the nearest camps within a specified radius (e.g., 10 kilometers)
    const nearestCamps = await Camp.find({
      geolocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude] // Note: MongoDB uses [longitude, latitude] order
          },
          $maxDistance: 50000 // 10 kilometers in meters
        }
      }
    });
    res.status(200).json(nearestCamps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//get slots of a camp with camp id
export const getAllSlotsForCamp = async (req, res) => {
  try {
    const { campId } = req.body;

    // Find the camp by ID
    const camp = await Camp.findById(campId);
    if (!camp) {
      return res.status(404).json({ message: 'Camp not found' });
    }

    // Find all slots for the camp
    const slots = await Slot.find({ camp: campId });

    // Group slots by date
    const slotsByDate = {};
    slots.forEach(slot => {
      const date = slot.date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      if (!slotsByDate[date]) {
        slotsByDate[date] = [];
      }
      slotsByDate[date].push(slot);
    });

    res.status(200).json(slotsByDate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



async function isSlotAvailableForDate(campId, formattedDate, slot) {
  try {
    console.log("Query Parameters:", {
      camp: campId,
      date: formattedDate,
      startTime: slot.startTime,
      endTime: slot.endTime
    });
    // Find the camp
    const camp = await Camp.findById(campId);
    if (!camp) {
      return { isSlotAvailable: false, slotId: null };
    }

    // Check if the slot is within the camp's operational hours
    const { startTime, endTime } = camp;
    if (slot.startTime < startTime || slot.endTime > endTime) {
      console.log("not proper hrs")
      return { isSlotAvailable: false, slotId: null };
    }

    // Find the slot for the given date and time
    const slotInfo = await Slot.findOne({
      camp: campId,
      date: formattedDate,
      startTime: slot.startTime,
      endTime: slot.endTime
    });
    console.log("Slot Query Result:", slotInfo);

    if (!slotInfo) {
      console.log("no slots found")
      return { isSlotAvailable: false, slotId: null }; // Slot not found for the given date and time
    }

    // Check if there are available slots left
    if (slotInfo.slotsLeft > 0) {
      return { isSlotAvailable: true, slotId: slotInfo._id }; // Slot is available
    } else {
      console.log("no slots left")
      return { isSlotAvailable: false, slotId: null }; // No available slots left
    }
  } catch (error) {
    console.error(error);
    return { isSlotAvailable: false, slotId: null }; // Error occurred, return false
  }
}


// Function to generate JWT token
function generateToken(donor) {
  // Implement token generation logic (e.g., using JWT library)
}



//get all Posts 
export const getAwarenessPosts = async (req, res) => {
  try {
    const posts = await AwarenessPost.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'authorNGO',
        select: 'name imageURL' // Select fields for authorNGO
      })
      .populate({
        path: 'comments.author',
        select: 'name imageURL' // Select fields for comment authors
      })
      .populate({
        path: 'comments.replies.author',
        select: 'name imageURL' // Select fields for reply authors
      });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




//adding comments to posts
export const addCommentToPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await AwarenessPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({ author: req.body.donorId, comment });
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//viewing recipient requests for blood
export const viewRequests = async (req, res) => {
  try {
    const donorId = req.body.donorId;
    const requests = await RequestDetails.find({ donor: donorId }).populate('recipient', 'name phoneNumber').exec();
    res.status(200).json(requests);
    console.log(requests)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update the status of a request (accepted/declined) by donor
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await RequestDetails.findByIdAndUpdate(requestId, { status }, { new: true });
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//update donor profile
export const updateDonorProfile = async (req, res) => {
  try {
    const { donorId } = req.params; // Assuming donorId is passed as a parameter
    const { name, email, phoneNumber, address, bloodGroup } = req.body;

    // Find the donor by ID
    let donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Update donor fields
    donor.name = name || donor.name;
    donor.email = email || donor.email;
    donor.phoneNumber = phoneNumber || donor.phoneNumber;
    donor.address = address || donor.address;
    donor.bloodGroup = bloodGroup || donor.bloodGroup;

    // Check if the profile image is being updated
    if (req?.files?.image) {
      const path = req.files.image.path;
      const timestamp = Date.now(); // Get current timestamp
      const public_id = `users/${name}_${timestamp}`;

      // Upload the new profile image to cloudinary
      let imageURL = null;
      await cloudinary.uploader.upload(path, {
        public_id: public_id,
        width: 500,
        height: 300
      })
        .then((result) => {
          imageURL = result.secure_url;
        })
        .catch((error) => {
          console.log("Image upload error:", error);
        });

      // Update the imageURL field in the donor document
      donor.imageURL = imageURL;
    }

    // Save the updated donor document
    donor = await donor.save();

    res.status(200).json({ message: 'Donor profile updated successfully', payload: donor });
  } catch (err) {
    console.error('Error updating donor profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
