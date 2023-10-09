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

export const getListing = async (req, res, next) => {
	try {
		const listing = await listingModel.findById(req.params.id);
		if (!listing) {
			return next(errorHandler(404, 'Listing not found'));
		}
		return res.status(200).json(listing);
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
		return res.status(200).json('Listing has been deleted');
	} catch (err) {
		next(err);
	}
};

export const editListing = async (req, res, next) => {
	const listing = await listingModel.findById(req.params.id);
	if (!listing) {
		return next(errorHandler(404, 'Listing not found'));
	}
	if (req.user.id !== listing.userRef) {
		return next(errorHandler(401, 'You can only edit your own listing'));
	}

	try {
		const updatedListing = await listingModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		return res.status(200).json(updatedListing);
	} catch (err) {
		next(err);
	}
};
