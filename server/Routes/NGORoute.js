import express from 'express';
import { createBloodDonationCamp, getPreviousCamps, loginNGO, registerNGO } from '../Controllers/NGOController.js';

const ngoroute = express.Router();

ngoroute.post('/create-camp', createBloodDonationCamp);
ngoroute.post('/register', registerNGO);
ngoroute.post('/login', loginNGO);
ngoroute.post('/previous-camps', getPreviousCamps);


export default ngoroute;
