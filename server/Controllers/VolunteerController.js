import Volunteer from '../Models/Volunteer.js';
import Camp from '../Models/Camp.js';

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

export const loginVolunteer = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const volunteer = await Volunteer.findOne({ phoneNumber });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Add password validation logic here

    res.json({ message: 'Volunteer logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

    // Check if the camp has reached its maximum capacity for volunteers
    if (camp.volunteers.length >= camp.maxVolunteers) {
      return res.status(400).json({ message: 'Camp has reached maximum capacity for volunteers' });
    }

    // Add the volunteer to the camp's list of volunteers
    camp.volunteers.push(volunteerId);
    await camp.save();
    volunteer.campsParticipated.push(campId);
    await volunteer.save();

    res.json({ message: 'Volunteer joined the camp successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
