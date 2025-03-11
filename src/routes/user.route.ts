import express from 'express';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import { BadRequestException } from '@/config/http-exception';
import { asyncHandler } from '@/utils/async-handler';
import { UserController } from '@/modules/user/controllers';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const userRoute = express.Router();

userRoute.get('/list', authMiddleware, asyncHandler(UserController.getListUsers));

userRoute.post('/add', authMiddleware, asyncHandler(UserController.addNewUser));

userRoute.get('/throw-exception', () => {
  throw new BadRequestException(RESPONSE_CODE.COMMON_BAD_REQUEST);
});
