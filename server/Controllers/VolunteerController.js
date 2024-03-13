import Volunteer from '../Models/Volunteer.js';
import Camp from '../Models/Camp.js';
import Appointment from '../Models/Appointment.js';
import Slot from '../Models/Slot.js';
import Donor from '../Models/Donor.js';
import BloodQuantity from '../Models/BloodQuantity.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";

import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});
//Volunteer Signup
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, contactNumber, aadhaarNumber, address } = req.body;

    let path = req.files?.image?.path
    let imageURL = null

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
    // hash the password
    const hashedPassword = bcrypt.hashSync(password);

    const volunteer = await Volunteer.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      aadhaarNumber,
      address,
      ...(imageURL && { imageURL })
    });

    res.status(200).json({ message: 'Volunteer registered successfully', payload: volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Volunteer Login
export const loginVolunteer = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    console.log(phoneNumber,password)
    const volunteer = await Volunteer.findOne({ contactNumber: phoneNumber  });
    console.log(volunteer)
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Check if password is correct
    const isPasswordValid = bcrypt.compareSync(password, volunteer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Volunteer logged in successfully', payload: volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Update Live Location
export const updateVolunteerLocation = async (req, res) => {
  try {

    const { volunteerId, latitude, longitude } = req.body;

    // Find the volunteer by ID
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Update live location
    volunteer.livelocation = { latitude, longitude };
    await volunteer.save();

    res.json({ message: 'Live location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Search camps based on camp name
export const searchBloodDonationCamps = async (req, res) => {
  try {
    const query = req.params.query;
    const camps = await Camp.find({
      name: { $regex: new RegExp(query, 'i') }
    });
    res.json(camps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//search camps by location (nearest)
export const findNearestCamps = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Find the nearest camps within a specified radius (e.g., 10 kilometers)
    const nearestCamps = await Camp.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude] // Note: MongoDB uses [longitude, latitude] order
          },
          $maxDistance: 10000 // 10 kilometers in meters
        }
      }
    });
    res.status(200).json(nearestCamps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Joining a Camp
export const joinCamp = async (req, res) => {
  try {
    const { volunteerId, campId } = req.body;

    // Find the volunteer
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Find the camp
    const camp = await Camp.findById(campId);
    if (!camp) {
      return res.status(404).json({ message: 'Blood donation camp not found' });
    }

    // Check if the volunteer is already joined to the camp
    if (camp.volunteers.includes(volunteerId)) {
      return res.json({ message: 'Volunteer is already joined to the camp' });
    }
    // Add the volunteer to the camp's list of volunteers
    camp.volunteers.push(volunteerId);
    await camp.save();
    volunteer.campsParticipated.push(campId);
    await volunteer.save();

    res.status(200).json({ message: 'Volunteer joined the camp successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const mapBloodGroup = (bloodGroup) => {
  switch (bloodGroup) {
    case 'A+':
      return 'A_positive';
    case 'A-':
      return 'A_negative';
    case 'B+':
      return 'B_positive';
    case 'B-':
      return 'B_negative';
    case 'AB+':
      return 'AB_positive';
    case 'AB-':
      return 'AB_negative';
    case 'O+':
      return 'O_positive';
    case 'O-':
      return 'O_negative';
    default:
      return bloodGroup;
  }
};

export const myCamps = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Find the volunteer by ID
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Get the list of camps the volunteer has participated in
    const volunteerCamps = volunteer.campsParticipated;
    let camps = []
    // Iterate over volunteerCamps array
    for (const campId of volunteerCamps) {
      try {
        // Find camp details by ID
        const camp = await Camp.findById(campId);
        if (camp) {
          // If camp found, push it to the camps array
          camps.push(camp);
        }
      } catch (err) {
        console.error(`Error fetching camp details for camp ID ${campId}:`, err);
      }
    }
    res.status(200).json(camps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const markAppointmentAsDonated = async (req, res) => {
  try {
    // Extract the appointment ID from the request body or params
    const { slotId, donorId, quantity, bloodGroup, status } = req.body; // Assuming appointmentId is provided in the request body
    // Find the appointment by ID
    const appointment = await Appointment.findOne({
      slot: slotId, donor: donorId
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // If status is 'Rejected', update the donor status and return
    if (status === 'Rejected') {
      await Appointment.updateOne(
        { slot: slotId, donor: donorId },
        { $set: { donated: false, quantity } },
      );

      // Respond with success message
      return res.json({ message: 'Donation rejected successfully' });
    }

    // Mark the appointment as donated
    await Appointment.updateOne(
      { slot: slotId, donor: donorId },
      { $set: { donated: true, quantity, bloodGroup } },
    );

    const bloodGroupDB = mapBloodGroup(bloodGroup);
    // Update the blood quantity for the camp
    const bloodQuantity = await BloodQuantity.findOne({ camp: appointment.camp });
    if (!bloodQuantity) {
      // If no blood quantity record exists for the camp, create a new one
      const newBloodQuantity = new BloodQuantity({
        camp: appointment.camp,
        [bloodGroupDB]: quantity
      });
      await newBloodQuantity.save();
    } else {
      // If blood quantity record exists, update the quantity for the corresponding blood group
      bloodQuantity[bloodGroupDB] += +quantity;
      await bloodQuantity.save();
    }

    // Respond with success message
    res.json({ message: 'Appointment marked as donated successfully' });
  } catch (error) {
    console.error('Error marking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//get slot + donor details for a camp
export const getAllSlotsWithDonorsForCamp = async (req, res) => {
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
    for (const slot of slots) {
      const date = slot.date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

      // Find appointments for this slot
      const appointments = await Appointment.find({ slot: slot._id }).populate('donor');

      if (!slotsByDate[date]) {
        slotsByDate[date] = [];
      }

      // Construct donor details
      const donors = appointments.map(appointment => ({
        _id: appointment.donor._id,
        name: appointment.donor.name,
        bloodGroup: appointment.bloodGroup,
        status: appointment.donated ? 'Donated' : 'Pending', // Assuming status based on donated flag
        unitsDonated: appointment.quantity,
      }));

      slotsByDate[date].push({ ...slot._doc, donors });
    }

    res.status(200).json(slotsByDate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
