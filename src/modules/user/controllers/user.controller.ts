import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { jsonResponse } from '@/utils/transform-response';
import { StatusCodes } from '@/config/http-status-codes';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/services';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

export const getListUsers = async (req: Request, res: Response) => {
  const { search } = req.query;
  const users = await UserService.getListUser({
    search: <string>search,
  });

  return jsonResponse({
    res: res,
    httpStatus: StatusCodes.OK,
    success: true,
    data: plainToInstance(User, users),
  });
};

export const addNewUser = async (req: Request, res: Response) => {
  const body = req.body;
  const data: CreateUserDto = {
    first_name: body.first_name,
    email: body.email,
    password: body.password,
  };

  const user = await UserService.addNewUser(data);

  return jsonResponse({
    res: res,
    httpStatus: StatusCodes.OK,
    success: true,
    data: plainToInstance(User, user),
  });
};
