import express from 'express';
import { 
  registerDonor,
  loginDonor,
  getDonorAppointments,
  bookAppointment,
  searchBloodDonationCamps
} from '../Controllers/DonorController.js';

const donorrouter = express.Router();

// Route for donor registration
donorrouter.post('/register', registerDonor);

// Route for donor login
donorrouter.post('/login', loginDonor);

// Route to get old appointments for a donor
donorrouter.get('/:donorId/appointments', getDonorAppointments);

// Route to book an appointment for a donor
donorrouter.post('/:donorId/appointments', bookAppointment);

// Route to search for blood donation camps
donorrouter.get('/blood-donation-camps/:query', searchBloodDonationCamps);

export default donorrouter;
