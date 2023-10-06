import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		regularPrice: {
			type: Number,
			required: true,
		},
		discountPrice: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		bathrooms: {
			type: Number,
			required: true,
		},
		bedrooms: {
			type: Number,
			required: true,
		},
		furnished: {
			type: Boolean,
			required: true,
		},
		parking: {
			type: Boolean,
			required: true,
		},
		offer: {
			type: Boolean,
			required: true,
		},
		images: {
			type: Array,
		},
		userRef: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const listingModel = mongoose.model('Listing', listingSchema);
export default listingModel;
