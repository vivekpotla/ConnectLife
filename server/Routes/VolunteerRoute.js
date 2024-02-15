import express from 'express';
import { registerVolunteer, loginVolunteer, joinCamp } from '../Controllers/VolunteerController';

const volunteerroute = express.Router();

volunteerroute.post('/volunteers/register', registerVolunteer);
volunteerroute.post('/volunteers/login', loginVolunteer);
volunteerroute.post('/volunteers/join-camp', joinCamp);

export default volunteerroute;
