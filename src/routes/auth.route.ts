import express from 'express';
import { asyncHandler } from '@/utils/async-handler';
import { AuthController } from '@/modules/auth/controllers';
import { schemaValidation } from '@/middlewares/schema-validation.middleware';
import { loginSchema } from '@/modules/auth/schema-validations/login.schema';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const authRoute = express.Router();

authRoute.post('/login', schemaValidation(loginSchema), asyncHandler(AuthController.login));

authRoute.post('/logout', authMiddleware, asyncHandler(AuthController.logout));

authRoute.post('/refresh-token', asyncHandler(AuthController.refreshToken));
