import express from 'express';
import { createBloodDonationCamp } from '../Controllers/NGOController.js';

const ngoroute = express.Router();

ngoroute.post('/blood-donation-camps', createBloodDonationCamp);

export default ngoroute;
