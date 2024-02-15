import express from 'express';
import { createBloodDonationCamp, getPreviousCamps, loginNGO, registerNGO,notifyUsers } from '../Controllers/NGOController.js';

const ngoroute = express.Router();

ngoroute.post('/create-camp', createBloodDonationCamp);
ngoroute.post('/register', registerNGO);
ngoroute.post('/login', loginNGO);
ngoroute.post('/previous-camps', getPreviousCamps);
ngoroute.post('/notify-users', notifyUsers);

export default ngoroute;
