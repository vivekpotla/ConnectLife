import express from 'express';
import { 
  registerDonor,
  loginDonor,
  getDonorAppointments,
  bookAppointment,
  searchBloodDonationCamps,
  updateDonorLocation
} from '../Controllers/DonorController.js';
const donorrouter = express.Router();

// Route for donor registration
donorrouter.post('/register', registerDonor);

// Route for donor login
donorrouter.post('/login', loginDonor);

// Route to get old appointments for a donor
donorrouter.get('/appointments/:donorId', getDonorAppointments);

// Route to book an appointment for a donor
donorrouter.post('/book-appointment', bookAppointment);

// Route to search for blood donation camps
donorrouter.get('/camps/:query', searchBloodDonationCamps);


//update live location
donorrouter.post('/location/', updateDonorLocation);

export default donorrouter;
