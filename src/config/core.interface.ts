import { Request } from 'express';
import { StatusCodes } from '@/config/http-status-codes';
import { RESPONSE_CODE } from '@/enums/response-code.enum';

export interface ICoreRequest extends Request {
  user?: Record<string, unknown>;
}

export interface ICoreError extends Error {
  statusCode?: StatusCodes;
  errors?: unknown[];
  code?: RESPONSE_CODE;
}
