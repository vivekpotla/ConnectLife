import Donor from "../Models/Donor.js";
import RequestDetails from "../Models/DetailsRequest.js"
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import Recipient from "../Models/Recipient.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

//signup recipient
export const registerRecipient = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, aadhaarNumber, bloodGroup, address } = req.body;
    // Check if phoneNumber is already registered
    const existingRecipient = await Recipient.findOne({ phoneNumber });
    if (existingRecipient) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
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

    //hash the password
    const hashedPassword = bcrypt.hashSync(password);

    // Create new recipient
    const newRecipient = await Recipient.create({ name, email, password: hashedPassword, phoneNumber, bloodGroup, address, aadhaarNumber, ...(imageURL && { imageURL }) });
    res.status(200).json({ message: 'Recipient registered successfully', payload: newRecipient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//login 
//donor login
export const loginRecipient = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Check if recipient exists with provided phoneNumber
    const recipient = await Recipient.findOne({ phoneNumber });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    // Check if password is correct
    const isPasswordValid = bcrypt.compareSync(password, recipient.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Recipient logged in successfully', payload: recipient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
Donor.collection.createIndex({point:"2dsphere"});
//find the nearest donors in 10km range
export const findNearestDonors = async (req, res) => {
  try {
    const { recipientLatitude, recipientLongitude, bloodType } = req.body;
    // Find the nearest donors within a specified radius (e.g., 10 kilometers)
    const nearestDonors = await Donor.find({
      livelocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [recipientLongitude, recipientLatitude] // Note: MongoDB uses [longitude, latitude] order
          },
          $maxDistance: 25000 // 10 kilometers in meters
        }
      },
      //bloodGroup:bloodType
    })
    // .select('name _id bloodGroup');;
    res.status(200).json(nearestDonors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Create a new request from recipient to donor
export const createRequest = async (req, res) => {
  try {
    const { recipientId, donorId } = req.body;
    const existingRequest = await RequestDetails.findOne({ recipient: recipientId, donor: donorId });

    if (existingRequest) {
      // If a request already exists, respond with a message indicating that the request has already been made
      return res.status(200).json({ message: 'A request from this recipient to this donor already exists.' });
    }

    const request = await RequestDetails.create({ recipient: recipientId, donor: donorId });

    // Get donor email
    const donor = await Donor.findById(donorId);
    const donorEmail = donor.email;

    // Send email to donor requesting blood
    await sendEmailToDonor(donorEmail, 'Blood Request', 'You have a new blood request. Please login to your ConnectLife account to view the details.');

    return res.status(201).json(request);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to send email to donor
const sendEmailToDonor = async (to, subject, text) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kamarapuvikas@gmail.com",
        pass: "qylwofsjmvxewelm"
      }
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"ConnectLife" your-email@gmail.com', // sender address
      to, // recipient address
      subject, // Subject line
      text, // plain text body
    });

    console.log('Email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


//view all my request
export const viewRequests = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const requests = await RequestDetails.find({ recipient: recipientId }).populate('donor', 'name email phoneNumber bloodGroup').exec();

    // Filter requests based on status and include donor contact details if status is accepted
    const filteredRequests = requests.map(request => {
      if (request.status !== 'accepted') {
        return { ...request.toJSON(), donor: request.donor.name };
      } else {
        return request.toJSON();
      }
    });

    res.status(200).json(filteredRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




//search for donors by their name or bloodType
export const searchDonors = async (req, res) => {
  try {
    const { bloodType } = req.body;
    // Find donors based on the query
    const donors = await Donor.find({ bloodGroup: bloodType }).select('name bloodGroup').exec();
    res.status(200).json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


