import express from 'express';

import { createRequest, findNearestDonors, searchDonors, viewRequests,registerRecipient,loginRecipient } from '../Controllers/RecipientController.js';

const recipientroute = express.Router();

recipientroute.post('/signup', registerRecipient);
recipientroute.post('/login', loginRecipient);
recipientroute.post('/get-nearest-donors', findNearestDonors);
recipientroute.post('/search-donor', searchDonors);
recipientroute.post('/create-request', createRequest);
recipientroute.post('/view-requests', viewRequests);


export default recipientroute;