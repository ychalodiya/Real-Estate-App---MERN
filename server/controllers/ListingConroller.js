import listingModel from '../models/ListingModel.js';

export const createListing = async (req, res, next) => {
	try {
		const listing = await listingModel.create(req.body);
		return res.status(201).json(listing);
	} catch (err) {
		next(err);
	}
};
