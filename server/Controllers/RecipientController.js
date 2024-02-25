import Donor from "../Models/Donor.js";
import RequestDetails from "../Models/DetailsRequest.js"
import dotenv from 'dotenv';
import Recipient from "../Models/Recipient.js";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

//signup recipient
export const registerRecipient = async (req, res) => {
  try {
    const { name, email, password, phoneNumber,aadhaarNumber, bloodGroup ,address } = req.body;
    // Check if phoneNumber is already registered
    const existingRecipient = await Recipient.findOne({ phoneNumber });
    if (existingRecipient) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    let path = req.files.image.path
    let imageURL = null
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
    
    // Create new recipient
    const newRecipient = await Recipient.create({ name, email, password, phoneNumber, bloodGroup ,address,aadhaarNumber,  ...(imageURL && { imageURL })});
    res.json(newRecipient);
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
    const isPasswordValid = bcrypt.compareSync(password,recipient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    return res.status(200).json(recipient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//find the nearest donors in 10km range
export const findNearestDonors = async (req, res) => {
    try {
        const { recipientLatitude, recipientLongitude } = req.body;

        // Find the nearest donors within a specified radius (e.g., 10 kilometers)
        const nearestDonors = await Donor.find({
            livelocation: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [recipientLongitude, recipientLatitude] // Note: MongoDB uses [longitude, latitude] order
                    },
                    $maxDistance: 10000 // 10 kilometers in meters
                }
            }
        });
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
      const request = await RequestDetails.create({ recipient: recipientId, donor: donorId });
      res.status(201).json(request);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
  
//view all my request
export const viewRequests = async (req, res) => {
    try {
      const { recipientId } = req.body;
      const requests = await RequestDetails.find({ recipient: recipientId }).populate('donor', 'name email phoneNumber status').exec();
      
      // Filter requests based on status and include donor contact details if status is accepted
      const filteredRequests = requests.map(request => {
        if (request.status === 'accepted') {
          return { ...request.toJSON(), donor: { ...request.donor.toJSON(), email: request.donor.email, phoneNumber: request.donor.phoneNumber } };
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
        const { name, bloodType } = req.body;

        let query = {};

        // Check if name or bloodType is provided in the request
        if (name) {
            // Case-insensitive search for donors by name
            query.name = { $regex: new RegExp(name, 'i') };
        }
        if (bloodType) {
            // Search for donors by bloodType
            query.bloodGroup = bloodType;
        }

        // Find donors based on the query
        const donors = await Donor.find(query);

        res.status(200).json(donors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


