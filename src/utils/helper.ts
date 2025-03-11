import jwt from 'jsonwebtoken';
import { ConfigApp } from '@/config/constant';
import bcrypt from 'bcrypt';

export function calculateExpiration(expire: string) {
  try {
    const sign = jwt.sign({}, ConfigApp.JWT.JWT_SECRET, {
      expiresIn: expire,
      algorithm: ConfigApp.JWT.JWT_ALGORITHM,
    });

    const decoded = jwt.decode(sign);
    if (decoded && typeof decoded === 'object') {
      return decoded.exp;
    }
  } catch (e) {
    console.error(e);
  }

  return 0;
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
}

export function isEnumMember<T extends Record<string, unknown>>(value: unknown, enumType: T): value is T {
  return Object.values(enumType).includes(value);
}
