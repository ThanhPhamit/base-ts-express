import { Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { ICoreRequest } from '@/config/core.interface';
import { jsonResponse } from '@/utils/transform-response';
import { StatusCodes } from '@/config/http-status-codes';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import { ConfigApp } from '@/config/constant';
import { JWT_TYPE } from '@/modules/auth/enums/auth.enum';
import { AuthService } from '@/modules/auth/services';
import { UserService } from '@/modules/user/services';
import i18next from 'i18next';
import { logError } from '@/utils/logger';

/**
 * Middleware to authenticate users based on JWT tokens.
 */
export const authMiddleware = async (req: ICoreRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    jsonResponse({
      res: res,
      httpStatus: StatusCodes.UNAUTHORIZED,
      message: i18next.t(RESPONSE_CODE.AUTH_TOKEN_MISSING),
      code: RESPONSE_CODE.AUTH_TOKEN_MISSING,
    });
    return;
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, ConfigApp.JWT.JWT_PUBLIC_KEY, {
      algorithms: [ConfigApp.JWT.JWT_ALGORITHM],
    });
    if (
      decoded &&
      typeof decoded === 'object' &&
      decoded.type === JWT_TYPE.ACCESS_TOKEN &&
      !(await AuthService.getRevokedToken(decoded.access_token_id))
    ) {
      // If the token is valid and not revoked, attach the user information to the request object
      req.user = { ...decoded };

      // Fetch the user from the database and check if the user is active
      const user = await UserService.getUserById(<string>req.user.id);
      if (user && user.is_active) {
        return next();
      }
    }
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      logError('Error', <Error>error);
    }
  }

  jsonResponse({
    res: res,
    httpStatus: StatusCodes.UNAUTHORIZED,
    message: i18next.t(RESPONSE_CODE.AUTH_INVALID_TOKEN),
    code: RESPONSE_CODE.AUTH_INVALID_TOKEN,
  });
};
