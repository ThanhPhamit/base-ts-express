import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const ConfigApp = {
  PORT: process.env.PORT || 3000,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS ?? '',
  LOCALE: process.env.LOCALE ?? 'en',
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE as 'postgres',
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USERNAME: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE: process.env.DATABASE_NAME,
    SCHEMA: process.env.DATABASE_SCHEMA,
    LOGGING: process.env.DATABASE_LOGGING === 'true',
  },
  JWT: {
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_SECRET: process.env.JWT_SECRET as jwt.Secret,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN as string,
  },
};
