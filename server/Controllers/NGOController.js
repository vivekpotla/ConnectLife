import Slot from '../Models/Slot.js';
import Camp from '../Models/Camp.js';
import NGO from '../Models/NGO.js';
import Volunteer from '../Models/Volunteer.js';
import Donor from '../Models/Donor.js';
import Appointment from '../Models/Appointment.js';
import BloodQuantity from '../Models/BloodQuantity.js';
import twilio from "twilio";
import nodemailer from 'nodemailer';
import AwarenessPost from '../Models/NGOpost.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";

import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});
//NGO Register
export const registerNGO = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, description } = req.body;

    // Check if NGO with the provided email or phone number already exists
    const existingNGO = await NGO.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingNGO) {
      return res.status(400).json({ message: 'NGO with this email or phone number already exists' });
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
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);

    // Create new NGO
    const newNGO = await NGO.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      description,
      ...(imageURL && { imageURL })
    });

    res.status(200).json({ message: 'Ngo registered successfully', payload: newNGO });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//NGO Login
export const loginNGO = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Check if donor exists with provided phoneNumber
    const ngo = await NGO.findOne({ phoneNumber });
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    // Check if password is correct
    const isPasswordValid = bcrypt.compareSync(password, ngo.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Ngo logged in successfully', payload: ngo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//create camp
export const createBloodDonationCamp = async (req, res) => {
  try {
    const {
      ngoId,
      location,
      description,
      startDate,
      endDate,
      maxDonorsPerSlot,
      startTime,
      endTime,
      longitude,
      latitude,
      name

    } = req.body;

    let path = req?.files?.image?.path
    let imageURL = null
    
    if (path) {
      const timestamp = Date.now(); // Get current timestamp
      const public_id = `camps/${ngoId}_${timestamp}`;
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
    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Start time and end time of the day are required' });
    }

    const newCamp = await Camp.create({
      ngo: ngoId,
      location,
      geolocation: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      description,
      startDate,
      endDate,
      maxDonorsPerSlot,
      startTime,
      endTime,
      name,
      ...(imageURL && { imageURL })
    });

    const sD = new Date(startDate);
    const eD = new Date(endDate);
    // Calculate the difference in milliseconds
    const differenceInMs = eD.getTime() - sD.getTime();
    // Convert milliseconds to days
    const durationInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    //creating slots
    for (let i = 0; i < durationInDays + 1; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const startHour = parseInt(startTime.split(':')[0]);
      console.log("Start ", startHour)
      const endHour = parseInt(endTime.split(':')[0]);
      console.log("End ", endHour)
      for (let j = startHour; j < endHour; j++) {
        const slotStartTime = `${j}:00`;
        const slotEndTime = `${j + 1}:00`;

        for (let k = 0; k < 1; k++) {
          console.log("Slot created")
          await Slot.create({
            camp: newCamp._id,
            date: currentDate,
            startTime: slotStartTime,
            endTime: slotEndTime,
            maxDonorsPerSlot,
            slotsLeft: maxDonorsPerSlot
          });
        }
      }
    }

    // notifyUsers({campId:newCamp._id})
    res.json(newCamp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkBloodQuantity = async (req, res) => {
  try {
    // Extract the camp ID from the request body
    const { campId } = req.body;

    // Find the blood quantity for the specified camp
    const bloodQuantity = await BloodQuantity.findOne({ camp: campId });
    if (!bloodQuantity) {
      return res.status(404).json({ message: 'Blood quantity data not found for the specified camp' });
    }

    // Prepare the response object
    // Find the camp details
    const camp = await Camp.findById(campId);
    if (!camp) {
      return res.status(404).json({ message: 'Camp details not found for the specified camp' });
    }

    // Prepare the response object
    const response = {
      campId: bloodQuantity.camp,
      campName: camp.name,
      campAddress: camp.location,
      bloodQuantity: {
        A_positive: bloodQuantity.A_positive,
        A_negative: bloodQuantity.A_negative,
        B_positive: bloodQuantity.B_positive,
        B_negative: bloodQuantity.B_negative,
        AB_positive: bloodQuantity.AB_positive,
        AB_negative: bloodQuantity.AB_negative,
        O_positive: bloodQuantity.O_positive,
        O_negative: bloodQuantity.O_negative
      }
    };


    // Send the response
    res.status(200).json(response);
  } catch (error) {
    console.error('Error checking blood quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDonorsInCamp = async (req, res) => {
  try {
    const { campId } = req.body;

    // Find appointments where camp ID matches
    const appointments = await Appointment.find({ camp: campId }).populate('donor', 'name email phoneNumber donated');

    // Extract donor details from appointments
    const donors = {
      donated: [],
      notDonated: []
    };

    for (const appointment of appointments) {
      const donorDetails = {
        donorId: appointment.donor._id,
        name: appointment.donor.name,
        email: appointment.donor.email,
        phoneNumber: appointment.donor.phoneNumber
      };

      if (appointment.donated) {
        donors.donated.push(donorDetails);
      } else {
        donors.notDonated.push(donorDetails);
      }
    }

    // Get slot details for not donated appointments
    for (const donor of donors.notDonated) {
      const donorId = donor.donorId;
      const donorAppointments = await Appointment.find({ donor: donorId, donated: false }).populate('slot', 'date startTime endTime');
      const slotDetails = donorAppointments.map(appointment => ({
        date: appointment.slot.date,
        startTime: appointment.slot.startTime,
        endTime: appointment.slot.endTime
      }));
      donor.slotDetails = slotDetails;
    }
    for (const donor of donors.donated) {
      const donorId = donor.donorId;
      const donorAppointments = await Appointment.find({ donor: donorId, donated: true }).populate('slot', 'date startTime endTime');
      const slotDetails = donorAppointments.map(appointment => ({
        date: appointment.slot.date,
        startTime: appointment.slot.startTime,
        endTime: appointment.slot.endTime
      }));
      donor.slotDetails = slotDetails;
    }


    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//notify Volunteers by campId
export const notifyVolunteersByCampId = async (req, res) => {
  try {
    const { campId } = req.body;

    // Find the camp by ID
    const camp = await Camp.findById(campId);
    if (!camp) {
      return res.status(404).json({ message: 'Camp not found' });
    }

    // Find all volunteers
    const volunteers = await Volunteer.find();

    // Send notification to all volunteers
    const result = await sendNotificationToVolunteers(volunteers, camp);

    if (!result) {
      return res.status(404).json({ message: 'Error in sending notification' });
    }

    res.status(200).json({ message: 'Notifications sent to all volunteers successfully' });
  } catch (error) {
    console.error('Error notifying volunteers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const accountSid = 'ACca1a2e49b90bb4dc87abfd05ea48f41e';
const authToken = 'eea0c25195c839f8c143b6539fddcde7';
const client = twilio(accountSid, authToken);


//notifying volunteers function
const sendNotificationToVolunteers = async (volunteers, campDetails) => {
  try {
    // Iterate through each volunteer
    for (const volunteer of volunteers) {
      // Send a notification to the volunteer
      await client.messages.create({
        body: `Hello ${volunteer.name}, ConnectLife: There's a new camp at ${campDetails.location}. Date: ${campDetails.startDate}`,
        from: '+17865743487',
        to: '+91' + volunteer.contactNumber
      });
    }
    console.log('Notifications sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

//notify Volunteers by Email
export const notifyVolunteersByEmail = async (req, res) => {
  try {
    const { campId } = req.body;

    // Find the camp by ID
    const camp = await Camp.findById(campId);
    if (!camp) {
      return res.status(404).json({ message: 'Camp not found' });
    }

    // Find all volunteers
    const volunteers = await Volunteer.find();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kamarapuvikas@gmail.com",
        pass: "qylwofsjmvxewelm"
      }
    });

    // Iterate over each volunteer and send an email
    for (const volunteer of volunteers) {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"NSS Camp" kamarapuvikas@gmail.com', // sender address
        to: volunteer.email, // list of receivers
        subject: "New Camp Notification", // Subject line
        text: `Hello ${volunteer.name}! There's a new camp at ${camp.name}. ${camp.description}`, // plain text body
        html: `<p>Hello ${volunteer.name}!</p><p>There's a new camp at ${camp.name}. ${camp.description}</p>`, // html body
      });

      console.log('Email sent to', volunteer.email);
    }

    res.status(200).json({ message: 'Emails sent to all volunteers successfully' });
  } catch (error) {
    console.error('Error notifying volunteers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const notifyDonors = (Donors, Camp) => {
  //Message Logic






  console.log('Notifying Donors:', Donors);
};


//Notify Donors and Volunteers for a camp separately
export const notifyUsers = async (req, res) => {


  const { campId } = req.body;
  let camp = Camp.find({ _id: campId });
  //Notify nearest volunteers and Donors code 
  let maxDistance = 10; //kms

  const nearestVolunteers = await Volunteer.find({
    livelocation: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [camp.geolocation.coordinates[0], camp.geolocation.coordinates[1]] // Specify camp location coordinates
        },
        $maxDistance: maxDistance * 1000 // Convert kilometers to meters
      }
    }
  });
  // Notify the nearest volunteers !!!! send the camp details also
  notifyVolunteers(nearestVolunteers, camp);
  //notify the nearest donors
  const nearestDonors = await Donor.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [camp.geolocation.coordinates[0], camp.geolocation.coordinates[1]]
        },
        $maxDistance: maxDistance * 1000
      }
    }
  });
  //notify the donors, send the camp detailss!!!!!!!
  notifyDonors(nearestDonors, camp);
};


//Get Previously Organized Camps
export const getPreviousCamps = async (req, res) => {
  try {
    const { ngoId } = req.body;

    // Find previous camps organized by the NGO
    const previousCamps = await Camp.find({ ngo: ngoId });

    res.json(previousCamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//Create Awareness Posts
//must use FormData in Client
export const createAwarenessPost = async (req, res) => {
  try {
    //const  form_data = req.body;
    let { ngoId, description, title } = req.body
    let imageURL = null;
    let path = req?.files?.image?.path
    const timestamp = Date.now(); // Get current timestamp
    const public_id = `posts/${ngoId}_${timestamp}`;
    await cloudinary.uploader.upload(path, {
      public_id: public_id,
      width: 500,
      height: 300
    })
      .then((result) => {
        imageURL = result.secure_url;
        console.log(imageURL)
      })
      .catch((error) => {
        console.log("image upload error")
        console.error(error);
      });
    console.log("NOW", imageURL)
    const newPost = new AwarenessPost({ title, description, imageURL, authorNGO: ngoId });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// replying to donor comments
export const replyToComment = async (req, res) => {
  try {

    const { postId, commentIndex, content } = req.body;
    // Find the post by ID
    const post = await AwarenessPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Check if the comment index is valid
    if (commentIndex < 0 || commentIndex >= post.comments.length) {
      return res.status(404).json({ message: 'Invalid comment index' });
    }
    // Add the reply to the comment
    post.comments[commentIndex].replies.push({
      author: req.body.ngoId,
      content,
    });
    // Save the post
    await post.save();
    res.status(200).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// edit or deleting posts 
export const editOrDeletePost = async (req, res) => {
  try {
    const { postId, type } = req.body;

    if (type === 'edit') {
      const { title, description } = req.body;

      let newImageURL = null;
      let path = req.files.image.path
      const timestamp = Date.now(); // Get current timestamp
      const public_id = `posts/${req.body.ngoId}_${timestamp}`;
      await cloudinary.uploader.upload(path, {
        public_id: public_id,
        width: 500,
        height: 300
      })
        .then((result) => {
          newImageURL = result.secure_url;
          console.log(newImageURL)
        })
        .catch((error) => {
          console.log("image upload error")
          console.error(error);
        });
      console.log("NOW", newImageURL)


      const updatedPost = await AwarenessPost.findOneAndUpdate(
        { _id: postId, authorNGO: req.body.ngoId },
        { title, description, imageURL: newImageURL },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found or you are not authorized to edit it' });
      }
      console.log("successful", updatedPost);
      return res.status(200).json(updatedPost);
    } else if (type === 'delete') {
      const deletedPost = await AwarenessPost.findOneAndDelete({ _id: postId, authorNGO: req.body.ngoId });

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found or you are not authorized to delete it' });
      }

      return res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid request type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//view all posts by an NGO
export const viewAllPosts = async (req, res) => {
  try {
    const posts = await AwarenessPost.find({ authorNGO: req.body.ngoId });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};