/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express';
import { jsonResponse } from '@/utils/transform-response';
import { ICoreError, ICoreRequest } from '@/config/core.interface';
import { EXCEPTION_TYPE } from '@/enums/exception-type.enum';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import { logError } from '@/utils/logger';
import { StatusCodes } from '@/config/http-status-codes';
import i18next from 'i18next';
import { isEnumMember } from '@/utils/helper';

const NOT_ALLOW_EXCEPTION_TYPE_FOR_LOG_FILE: EXCEPTION_TYPE | string[] = [
  EXCEPTION_TYPE.SyntaxException,
  EXCEPTION_TYPE.DtoValidationException,
  EXCEPTION_TYPE.ValidationException,
  EXCEPTION_TYPE.CorsException,
  EXCEPTION_TYPE.BadRequestException,
];

export const errorHandleMiddleware = (err: ICoreError, req: ICoreRequest, res: Response, next: NextFunction): void => {
  // Log the error if it is not in the list of exceptions that should not be logged
  if (!NOT_ALLOW_EXCEPTION_TYPE_FOR_LOG_FILE.includes(err.name)) {
    logError(err.message, err);
  }

  jsonResponse({
    res: res,
    httpStatus: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: i18next.t(err.message),
    success: false,
    errors: err.errors,
    code: isEnumMember(err.code, RESPONSE_CODE) ? err.code : RESPONSE_CODE.COMMON_BAD_REQUEST,
  });
};
