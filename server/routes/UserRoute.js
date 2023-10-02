import express from 'express';
import { test } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/test', test);

export default userRouter;
