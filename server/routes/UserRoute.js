import express from 'express';
import {
	deleteUser,
	getListings,
	test,
	updateUser,
} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);
userRouter.get('/listings/:id', verifyToken, getListings);

export default userRouter;
