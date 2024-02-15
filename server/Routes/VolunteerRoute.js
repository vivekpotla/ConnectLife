import express from 'express';
import { registerVolunteer, loginVolunteer, joinCamp, updateVolunteerLocation } from '../Controllers/VolunteerController.js';

const volunteerroute = express.Router();

volunteerroute.post('/register', registerVolunteer);
volunteerroute.post('/login', loginVolunteer);
volunteerroute.post('/join-camp', joinCamp);
//update live location
volunteerroute.post('/location/', updateVolunteerLocation);
export default volunteerroute;
