import userModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res, next) => {
	try {
		const { userName, email, password } = req.body;
		console.log(req.body);
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new userModel({
			userName,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).json('User created successfully');
	} catch (err) {
		next(err);
	}
};
