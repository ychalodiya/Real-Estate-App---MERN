import express from 'express';
import {
	createListing,
	deleteListing,
	editListing,
	getListing,
} from '../controllers/ListingConroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, createListing);
listingRouter.delete('/delete/:id', verifyToken, deleteListing);
listingRouter.post('/edit/:id', verifyToken, editListing);
listingRouter.get('/get/:id', getListing);

export default listingRouter;
