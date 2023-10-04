import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);

export default userRouter;
