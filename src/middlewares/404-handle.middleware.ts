import { Request, Response } from 'express';
import { jsonResponse } from '@/utils/transform-response';
import { StatusCodes } from '@/config/http-status-codes';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import i18next from 'i18next';

export const error404HandleMiddleware = (req: Request, res: Response): void => {
  jsonResponse({
    res: res,
    httpStatus: StatusCodes.NOT_FOUND,
    message: i18next.t(RESPONSE_CODE.COMMON_NOT_FOUND),
    success: false,
    code: RESPONSE_CODE.COMMON_NOT_FOUND,
  });
};
