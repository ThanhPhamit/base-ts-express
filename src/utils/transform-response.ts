import { Response } from 'express';
import { StatusCodes } from '@/config/http-status-codes';
import { ZodIssue } from 'zod';
import { ValidationError } from 'class-validator';
import i18next from 'i18next';

interface ITransformResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: unknown[];
  code?: string;
}

export function jsonResponse({
  res,
  httpStatus,
  data,
  message,
  code,
  success = false,
  errors = [],
}: {
  res: Response;
  httpStatus: StatusCodes;
  data?: unknown;
  message?: string;
  code?: string;
  success?: boolean;
  errors?: unknown[];
}) {
  const transformRes: ITransformResponse = {
    success: success,
  };

  if (code) transformRes.code = code;
  if (message) transformRes.message = message;
  if (data) transformRes.data = data;
  if (errors.length) transformRes.errors = errors;

  return res.status(httpStatus).json(transformRes);
}

export function transformSchemaValidationError(errors: ZodIssue[]) {
  const formattedErrors: Record<string, string>[] = [];

  errors.forEach((issue: ZodIssue) => {
    formattedErrors.push({
      msg: i18next.t(issue.message),
      path: issue.path.join('.'),
    });
  });

  return formattedErrors;
}

export function transformDtoValidationError(errors: ValidationError[]) {
  const formattedErrors: Record<string, string>[] = [];

  errors.forEach((error: ValidationError) => {
    if (error.constraints) {
      for (const constraintKey in error.constraints) {
        formattedErrors.push({
          msg: i18next.t(error.constraints[constraintKey]),
          path: error.property,
        });
        break;
      }
    }
  });

  return formattedErrors;
}
