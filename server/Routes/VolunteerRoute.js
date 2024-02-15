import express from 'express';
import { registerVolunteer, loginVolunteer, joinCamp, updateVolunteerLocation,findNearestCamps,searchBloodDonationCamps , myCamps } from '../Controllers/VolunteerController.js';

const volunteerroute = express.Router();

volunteerroute.post('/register', registerVolunteer);
volunteerroute.post('/login', loginVolunteer);
volunteerroute.post('/join-camp', joinCamp);
volunteerroute.post('/location/', updateVolunteerLocation);
volunteerroute.get('/campsearch/:query', searchBloodDonationCamps);
volunteerroute.post('/nearestcamps', findNearestCamps);
volunteerroute.get('/mycamps/:volunteerId', myCamps);
export default volunteerroute;
