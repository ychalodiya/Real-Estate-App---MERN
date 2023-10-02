import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

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
