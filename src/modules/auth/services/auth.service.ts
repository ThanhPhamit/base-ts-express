import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { RevokedToken } from '@/modules/auth/entities/revoked-token.entity';
import { revokedTokenRepository } from '@/modules/auth/repositories/revoked-token.repository';
import { ConfigApp } from '@/config/constant';
import { JWT_TYPE } from '@/modules/auth/enums/auth.enum';
import { calculateExpiration } from '@/utils/helper';

/**
 * Function to get a revoked token from the repository.
 */
export async function getRevokedToken(token: string): Promise<RevokedToken | null> {
  return await revokedTokenRepository.findOne({
    where: {
      token: token,
    },
  });
}

/**
 * Function to add a revoked token to the repository.
 */
export async function addRevokedToken({ token, type, expire }: { token: string; type: JWT_TYPE; expire: Date }) {
  const revokedToken = revokedTokenRepository.create({
    token: token,
    type: type,
    expires_at: expire,
  });

  return revokedTokenRepository.save(revokedToken);
}

/**
 * Function to generate access and refresh tokens for a user.
 */
export function generateTokens(userData: Record<string, unknown>) {
  // Generate unique IDs for the access and refresh tokens
  const accessTokenId = uuidv4();
  const refreshTokenId = uuidv4();

  // Calculate expiration times for the access and refresh tokens
  const access_token_exp = calculateExpiration(ConfigApp.JWT.JWT_EXPIRES_IN);
  const refresh_token_exp = calculateExpiration(ConfigApp.JWT.JWT_REFRESH_EXPIRES_IN);

  // Create the access token with user data and token details
  const accessToken = jwt.sign(
    {
      ...userData,
      type: JWT_TYPE.ACCESS_TOKEN,
      access_token_id: accessTokenId,
      access_token_exp: access_token_exp,
      refresh_token_id: refreshTokenId,
      refresh_token_exp: refresh_token_exp,
    },
    ConfigApp.JWT.JWT_SECRET,
    { expiresIn: ConfigApp.JWT.JWT_EXPIRES_IN },
  );

  // Create the refresh token with user data and token details
  const refreshToken = jwt.sign(
    {
      ...userData,
      type: JWT_TYPE.REFRESH_TOKEN,
      access_token_id: accessTokenId,
      access_token_exp: access_token_exp,
      refresh_token_id: refreshTokenId,
      refresh_token_exp: refresh_token_exp,
    },
    ConfigApp.JWT.JWT_SECRET,
    { expiresIn: ConfigApp.JWT.JWT_REFRESH_EXPIRES_IN },
  );

  return { accessToken, refreshToken };
}
