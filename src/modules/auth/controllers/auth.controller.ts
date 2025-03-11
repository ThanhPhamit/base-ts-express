import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ICoreRequest } from '@/config/core.interface';
import { UserService } from '@/modules/user/services';
import { AuthService } from '@/modules/auth/services';
import { jsonResponse } from '@/utils/transform-response';
import { StatusCodes } from '@/config/http-status-codes';
import { RESPONSE_CODE } from '@/enums/response-code.enum';
import { ConfigApp } from '@/config/constant';
import { JWT_TYPE } from '@/modules/auth/enums/auth.enum';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import i18next from 'i18next';

export const login = async (req: ICoreRequest, res: Response) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  const user = await UserService.getUserByEmail(emailInput);

  // Check if the user exists and is active
  if (user && user.is_active) {
    const { password, ...userData } = user;
    const isPasswordValid = await bcrypt.compare(passwordInput, password);
    if (isPasswordValid) {
      // Generate access and refresh tokens
      const { accessToken, refreshToken } = AuthService.generateTokens(userData);

      return jsonResponse({
        res: res,
        httpStatus: StatusCodes.OK,
        data: {
          user: userData,
          token: {
            expires_in: ConfigApp.JWT.JWT_EXPIRES_IN,
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
        success: true,
      });
    }
  }

  return jsonResponse({
    res: res,
    httpStatus: StatusCodes.UNAUTHORIZED,
    message: i18next.t(RESPONSE_CODE.AUTH_INVALID_USERNAME_PASSWORD),
    code: RESPONSE_CODE.AUTH_INVALID_USERNAME_PASSWORD,
    success: false,
  });
};

export const logout = async (req: ICoreRequest, res: Response) => {
  // Revoke the user's refresh token
  await AuthService.addRevokedToken({
    token: <string>req.user?.refresh_token_id,
    type: JWT_TYPE.REFRESH_TOKEN,
    expire: new Date((req.user?.refresh_token_exp as number) * 1000),
  });

  // Revoke the user's access token
  await AuthService.addRevokedToken({
    token: <string>req.user?.access_token_id,
    type: JWT_TYPE.ACCESS_TOKEN,
    expire: new Date((req.user?.access_token_exp as number) * 1000),
  });

  return jsonResponse({
    res: res,
    httpStatus: StatusCodes.OK,
    message: i18next.t(RESPONSE_CODE.AUTH_LOGOUT_SUCCESS),
    code: RESPONSE_CODE.AUTH_LOGOUT_SUCCESS,
    success: true,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshTokenInput = req.body.refresh_token;

    // Verify the refresh token using the JWT secret
    const decoded = jwt.verify(refreshTokenInput, ConfigApp.JWT.JWT_SECRET);

    // Check if the decoded token is valid, of type REFRESH_TOKEN, and not revoked
    if (
      decoded &&
      typeof decoded === 'object' &&
      decoded.type === JWT_TYPE.REFRESH_TOKEN &&
      !(await AuthService.getRevokedToken(decoded.refresh_token_id))
    ) {
      // Remove 'iat' and 'exp' properties from the decoded token
      delete decoded['iat'];
      delete decoded['exp'];

      // Revoke the old refresh token by adding it to the revoked tokens list
      await AuthService.addRevokedToken({
        token: decoded.refresh_token_id,
        type: JWT_TYPE.REFRESH_TOKEN,
        expire: new Date((decoded.refresh_token_exp as number) * 1000),
      });

      // Revoke the old access token by adding it to the revoked tokens list
      await AuthService.addRevokedToken({
        token: decoded.access_token_id,
        type: JWT_TYPE.ACCESS_TOKEN,
        expire: new Date((decoded.access_token_exp as number) * 1000),
      });

      // Generate new access and refresh tokens
      const { accessToken, refreshToken } = AuthService.generateTokens(decoded);

      return jsonResponse({
        res: res,
        httpStatus: StatusCodes.OK,
        data: {
          token: {
            expires_in: ConfigApp.JWT.JWT_EXPIRES_IN,
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
        success: true,
      });
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      console.log(err.name);
    }
  }

  return jsonResponse({
    res: res,
    httpStatus: StatusCodes.UNAUTHORIZED,
    message: i18next.t(RESPONSE_CODE.AUTH_INVALID_REFRESH_TOKEN),
    code: RESPONSE_CODE.AUTH_INVALID_REFRESH_TOKEN,
    success: false,
  });
};
