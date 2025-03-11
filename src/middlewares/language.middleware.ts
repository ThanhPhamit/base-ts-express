import { Response, NextFunction } from 'express';
import { ICoreRequest } from '@/config/core.interface';
import i18next from 'i18next';

/**
 * Middleware to set language.
 */
export const languageMiddleware = async (req: ICoreRequest, res: Response, next: NextFunction) => {
  const contentLanguage = req.headers['content-language'];
  await i18next.changeLanguage(contentLanguage);

  return next();
};
