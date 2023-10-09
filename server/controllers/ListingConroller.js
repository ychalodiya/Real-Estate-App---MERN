import listingModel from '../models/ListingModel.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
	try {
		const listing = await listingModel.create(req.body);
		return res.status(201).json(listing);
	} catch (err) {
		next(err);
	}
};

export const deleteListing = async (req, res, next) => {
	const listing = await listingModel.findById(req.params.id);
	if (!listing) {
		return next(errorHandler(404, 'Listing not found'));
	}
	if (req.user.id !== listing.userRef) {
		return next(errorHandler(401, 'You can only delete your own listing'));
	}

	try {
		await listingModel.findByIdAndDelete(req.params.id);
		return res.status(201).json('Listing has been deleted');
	} catch (err) {
		next(err);
	}
};
