import userModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new userModel({
			userName,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).json('User created successfully');
	} catch (err) {
		res.status(500).json(err.message);
	}
};
