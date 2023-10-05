import express from 'express';
import { google, signin, signup } from '../controllers/AuthController.js';
import { createListing } from '../controllers/ListingConroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, createListing);

export default listingRouter;
