import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/UserRoute.js';
import authRouter from './routes/AuthRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to the mongodb database.');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT, () => {
	console.log(`Server is listening on PORT: ${PORT}`);
});
