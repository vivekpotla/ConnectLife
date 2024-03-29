import express from 'express';
import {
    createBloodDonationCamp,
    createAwarenessPost,
    getPreviousCamps,
    loginNGO,
    registerNGO,
    notifyUsers,
    getDonorsInCamp,
    checkBloodQuantity,
    notifyVolunteersByCampId,
    notifyVolunteersByEmail,
    editOrDeletePost,
    viewAllPosts,
    replyToComment,
    viewAllCamps
} from '../Controllers/NGOController.js';

const ngoroute = express.Router();

ngoroute.post('/create-camp', createBloodDonationCamp);
ngoroute.post('/register', registerNGO);
ngoroute.post('/login', loginNGO);
ngoroute.post('/previous-camps', getPreviousCamps);
ngoroute.post('/notify-users', notifyUsers);
ngoroute.post('/get-donors-in-camp', getDonorsInCamp);
ngoroute.post('/get-blood-quantity', checkBloodQuantity);
ngoroute.post('/notify-volunteers', notifyVolunteersByCampId);
ngoroute.post('/notify-volunteers-email', notifyVolunteersByEmail);
ngoroute.post('/create-post', createAwarenessPost);
ngoroute.post('/edit-delete-post', editOrDeletePost);
ngoroute.post('/view-my-posts', viewAllPosts);
ngoroute.post('/reply-to-comment', replyToComment);
ngoroute.get('/view-all-camps', viewAllCamps);

export default ngoroute;
