import Volunteer from '../Models/Volunteer.js';
import Camp from '../Models/Camp.js';


//Volunteer Signup
export const registerVolunteer = async (req, res) => {
  try {
    const { name, phoneNumber, email, address } = req.body;

    const volunteer = new Volunteer({
      name,
      phoneNumber,
      email,
      address
    });

    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//Volunteer Login
export const loginVolunteer = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const volunteer = await Volunteer.findOne({ phoneNumber });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Add password validation logic here

    res.status(200).json({ message: 'Volunteer logged in successfully' ,payload:volunteer});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Update Live Location
export const updateVolunteerLocation = async (req, res) => {
  try {
    
    const {volunteerId , latitude, longitude } = req.body;

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
      $or: [
        { _id: query },
        { name: { $regex: new RegExp(query, 'i') } }
      ]
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
      return res.status(400).json({ message: 'Volunteer is already joined to the camp' });
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

    res.status(200).json(volunteerCamps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }

};

