import express from 'express';

import { findNearestDonors, searchDonors } from '../Controllers/RecipientController.js';

const recipientroute = express.Router();


recipientroute.post('/get-nearest-donors', findNearestDonors);
recipientroute.post('/search-donor', searchDonors);


export default recipientroute;