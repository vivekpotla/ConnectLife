import express from 'express';
import { createBloodDonationCamp } from '../Controllers/NGOController';

const ngoroute = express.Router();

ngoroute.post('/blood-donation-camps', createBloodDonationCamp);

export default ngoroute;
