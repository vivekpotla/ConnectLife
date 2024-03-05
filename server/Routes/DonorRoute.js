import express from 'express';
import { 
  registerDonor,
  loginDonor,
  getDonorAppointments,
  bookAppointment,
  searchBloodDonationCamps,
  updateDonorLocation,
  findNearestCamps,getAllSlotsForCamp, getAwarenessPosts, addCommentToPost, viewRequests, updateRequestStatus, updateDonorProfile
} from '../Controllers/DonorController.js';
const donorrouter = express.Router();

// Route for donor registration
donorrouter.post('/register', registerDonor);
// Route for donor login
donorrouter.post('/login', loginDonor);
// Route to get old appointments for a donor
donorrouter.get('/appointments/:donorId', getDonorAppointments);
// Route to get all slots date wise of a camp with campid
donorrouter.post('/camp/getslots', getAllSlotsForCamp);
// Route to book an appointment for a donor
donorrouter.post('/book-appointment', bookAppointment);
// Route to search for blood donation camps by name 
donorrouter.get('/search-camps/:query', searchBloodDonationCamps);
//nearest blood donation camps 
donorrouter.post('/nearestcamps', findNearestCamps);
//update live location
donorrouter.post('/location/', updateDonorLocation);
donorrouter.get('/get-all-posts', getAwarenessPosts);
donorrouter.post('/add-comments', addCommentToPost);
donorrouter.post('/view-recipient-requests', viewRequests);
donorrouter.post('/update-requests', updateRequestStatus);
donorrouter.post('/updateDonorProfile',updateDonorProfile);
export default donorrouter;
