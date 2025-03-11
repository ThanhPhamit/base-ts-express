import express from 'express';
import { userRoute } from './user.route';
import { authRoute } from './auth.route';

export const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/user', userRoute);
