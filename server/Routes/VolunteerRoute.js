import express from 'express';
import { registerVolunteer, loginVolunteer, joinCamp, updateVolunteerLocation,findNearestCamps,searchBloodDonationCamps,getAllSlotsWithDonorsForCamp , myCamps, markAppointmentAsDonated } from '../Controllers/VolunteerController.js';

const volunteerroute = express.Router();

volunteerroute.post('/register', registerVolunteer);
volunteerroute.post('/login', loginVolunteer);
volunteerroute.post('/join-camp', joinCamp);
volunteerroute.post('/location/', updateVolunteerLocation);
volunteerroute.get('/campsearch/:query', searchBloodDonationCamps);
volunteerroute.post('/nearestcamps', findNearestCamps);
volunteerroute.get('/mycamps/:volunteerId', myCamps);
volunteerroute.post('/mark-donated', markAppointmentAsDonated);
volunteerroute.post('/get-slot-details', getAllSlotsWithDonorsForCamp);

export default volunteerroute;
