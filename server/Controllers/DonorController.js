import Donor from '../Models/Donor.js';
import Appointment from '../Models/Appointment.js';
import Camp from '../Models/Camp.js';
import Slot from '../Models/Slot.js';

export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, bloodGroup } = req.body;

    // Check if phoneNumber is already registered
    const existingDonor = await Donor.findOne({ phoneNumber });
    if (existingDonor) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    // Create new donor
    const newDonor = await Donor.create({ name, email, password, phoneNumber, bloodGroup });

    res.json(newDonor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginDonor = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Check if donor exists with provided phoneNumber
    const donor = await Donor.findOne({ phoneNumber });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Check if password is correct
    const isPasswordValid = await donor.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken(donor);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDonorAppointments = async (req, res) => {
  try {
    const donorId = req.params.donorId;
    const appointments = await Appointment.find({ donor: donorId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const donorId = req.params.donorId;
    const { campId, date, slot } = req.body;

    // Check if the slot is available
    const isSlotAvailable = await isSlotAvailableForDate(campId, date, slot);
    if (!isSlotAvailable) {
      return res.status(400).json({ message: 'Slot is not available' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      donor: donorId,
      camp: campId,
      date,
      slot
    });
     // Decrement slotsLeft for the booked slot
     await Slot.findOneAndUpdate(
      { camp: campId, date, startTime: { $lte: slot.startTime }, endTime: { $gt: slot.endTime } },
      { $inc: { slotsLeft: -1 } } // Decrement slotsLeft by 1
    );
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

async function isSlotAvailableForDate(campId, date, slot) {
  try {
    // Find the camp
    const camp = await Camp.findById(campId);
    if (!camp) {
      return false;
    }

    // Check if the slot is within the camp's operational hours
    const { startTime, endTime } = camp;
    if (slot.startTime < startTime || slot.endTime > endTime) {
      return false;
    }

    // Find the slot for the given date and time
    const slotInfo = await Slot.findOne({
      camp: campId,
      date,
      startTime: { $lte: slot.startTime },
      endTime: { $gt: slot.endTime }
    });
    if (!slotInfo) {
      return false; // Slot not found for the given date and time
    }

    // Check if there are available slots left
    if (slotInfo.slotsLeft > 0) {
      return true; // Slot is available
    } else {
      return false; // No available slots left
    }
  } catch (error) {
    console.error(error);
    return false; // Error occurred, return false
  }
}


// Function to generate JWT token
function generateToken(donor) {
  // Implement token generation logic (e.g., using JWT library)
}
