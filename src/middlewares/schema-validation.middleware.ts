import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { InternalServerErrorException, ValidationException } from '@/config/http-exception';

export function schemaValidation(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error.errors);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  };
}
