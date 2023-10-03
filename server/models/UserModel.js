import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				'https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg',
		},
	},
	{ timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
