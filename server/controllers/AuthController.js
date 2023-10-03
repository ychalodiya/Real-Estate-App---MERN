import userModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
	const { userName, email, password } = req.body;
	try {
		const validUser = await userModel.findOne({ email });
		if (validUser) {
			return next(errorHandler(404, 'User is already exist!'));
		}
		const hashedPassword = await bcrypt.hash(password, 10);
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

export const google = async (req, res, next) => {
	const { name, email, photo } = req.body;
	console.log(req.body);
	try {
		const validUser = await userModel.findOne({ email });
		if (validUser) {
			const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
			const { password: pass, ...userInfo } = validUser._doc;
			res.status(200).json({ token, userInfo });
		} else {
			const passwordGenerator = Math.random().toString(36).slice(-8);
			const hashedPassword = await bcrypt.hash(passwordGenerator, 10);
			const userName =
				name.split(' ').join('').toLowerCase() +
				Math.random().toString(36).slice(-4);

			const newUser = new userModel({
				userName,
				email,
				password: hashedPassword,
				avatar: photo,
			});
			await newUser.save();
			const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
			const { password: pass, ...userInfo } = validUser._doc;
			res.status(200).json({ token, userInfo });
		}
	} catch (err) {
		next(err);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await userModel.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, 'User not found!'));
		}
		const validPassword = await bcrypt.compare(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(404, 'Wrong credentials!'));
		}

		const { password: pass, ...userInfo } = validUser._doc;
		const token = jwt.sign(
			{
				id: validUser._id,
			},
			process.env.JWT_SECRET
		);

		res.status(200).json({ token, userInfo });
	} catch (err) {
		next(err);
	}
};
