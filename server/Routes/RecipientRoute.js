import express from 'express';

import { createRequest, findNearestDonors, searchDonors, viewRequests } from '../Controllers/RecipientController.js';

const recipientroute = express.Router();


recipientroute.post('/get-nearest-donors', findNearestDonors);
recipientroute.post('/search-donor', searchDonors);
recipientroute.post('/create-request', createRequest);
recipientroute.post('/view-requests', viewRequests);


export default recipientroute;