import bcrypt from 'bcrypt';
import userModel from '../models/UserModel.js';
export const test = (req, res) => {
	res.json({ message: 'This is a simple test api route' });
};

export const updateUser = async (req, res, next) => {
	if (req.params.id !== req.user.id) {
		return next(errorHandler(401, 'You can update only your account'));
	}

	try {
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
		}
		const updateUser = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					userName: req.body.userName,
					email: req.body.email,
					password: req.body.password,
					avatar: req.body.avatar,
				},
			},
			{ new: true }
		);

		const { password, ...userInfo } = updateUser._doc;
		res.status(200).json(userInfo);
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (req, res, next) => {
	if (req.params.id !== req.user.id) {
		return next(errorHandler(401, 'You can delete only your account'));
	}
	try {
		await userModel.findByIdAndDelete(req.params.id);
		res.status(200).json('User has been deleted');
	} catch (err) {
		next(err);
	}
};
