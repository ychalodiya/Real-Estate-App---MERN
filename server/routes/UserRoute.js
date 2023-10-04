import express from 'express';
import { test, updateUser } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyToken, updateUser);

export default userRouter;
