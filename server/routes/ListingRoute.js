import express from 'express';
import {
	createListing,
	deleteListing,
} from '../controllers/ListingConroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, createListing);
listingRouter.post('/delete/:id', verifyToken, deleteListing);

export default listingRouter;
