import { ValidationError as DtoValidationError } from 'class-validator';
import { StatusCodes } from '@/config/http-status-codes';
import { EXCEPTION_TYPE } from '@/enums/exception-type.enum';
import { ZodIssue } from 'zod';
import { transformDtoValidationError, transformSchemaValidationError } from '@/utils/transform-response';
import { RESPONSE_CODE } from '@/enums/response-code.enum';

class HttpException extends Error {
  statusCode: StatusCodes;
  errors: unknown[];
  code: RESPONSE_CODE;

  constructor(
    message: string,
    exceptionType: EXCEPTION_TYPE,
    statusCode: StatusCodes = StatusCodes.BAD_REQUEST,
    code: RESPONSE_CODE = RESPONSE_CODE.COMMON_ERROR,
    errors?: unknown[],
  ) {
    super(message);
    this.name = exceptionType;
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }

    if (code) {
      this.code = code;
    }
  }
}

/**
 * The HTTP response status code will be 400.
 */
export class BadRequestException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(message, EXCEPTION_TYPE.BadRequestException, StatusCodes.BAD_REQUEST, RESPONSE_CODE.COMMON_ERROR, errors);
  }
}

/**
 * The HTTP response status code will be 401.
 */
export class UnauthorizedException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(message, EXCEPTION_TYPE.UnauthorizedException, StatusCodes.UNAUTHORIZED, RESPONSE_CODE.COMMON_ERROR, errors);
  }
}

/**
 * The HTTP response status code will be 403.
 */
export class ForbiddenException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(message, EXCEPTION_TYPE.ForbiddenException, StatusCodes.FORBIDDEN, RESPONSE_CODE.COMMON_ERROR, errors);
  }
}

/**
 * The HTTP response status code will be 404.
 */
export class NotFoundException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(message, EXCEPTION_TYPE.NotFoundException, StatusCodes.NOT_FOUND, RESPONSE_CODE.COMMON_ERROR, errors);
  }
}

/**
 * The HTTP response status code will be 405.
 */
export class MethodNotAllowedException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.MethodNotAllowedException,
      StatusCodes.METHOD_NOT_ALLOWED,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code will be 413.
 */
export class PayloadTooLargeException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.PayloadTooLargeException,
      StatusCodes.REQUEST_TOO_LONG,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code will be 415.
 */
export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.UnsupportedMediaTypeException,
      StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code will be 429.
 */
export class TooManyRequestsException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.TooManyRequestsException,
      StatusCodes.TOO_MANY_REQUESTS,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code will be 500.
 */
export class InternalServerErrorException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.InternalServerErrorException,
      StatusCodes.INTERNAL_SERVER_ERROR,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code will be 503.
 */
export class ServiceUnavailableException extends HttpException {
  constructor(message: string, errors?: unknown[]) {
    super(
      message,
      EXCEPTION_TYPE.ServiceUnavailableException,
      StatusCodes.SERVICE_UNAVAILABLE,
      RESPONSE_CODE.COMMON_ERROR,
      errors,
    );
  }
}

/**
 * The HTTP response status code for Validation.
 */
export class ValidationException extends HttpException {
  constructor(errors?: ZodIssue[]) {
    let transformError;
    if (errors?.length) {
      transformError = transformSchemaValidationError(errors);
    }

    super(
      'Validation Error',
      EXCEPTION_TYPE.ValidationException,
      StatusCodes.BAD_REQUEST,
      RESPONSE_CODE.COMMON_ERROR,
      transformError,
    );
  }
}

/**
 * The HTTP response status code for DTO Validation.
 */
export class DtoValidationException extends HttpException {
  constructor(errors?: DtoValidationError[]) {
    let transformError;
    if (errors?.length) {
      transformError = transformDtoValidationError(errors);
    }

    super(
      'Validation Error',
      EXCEPTION_TYPE.DtoValidationException,
      StatusCodes.BAD_REQUEST,
      RESPONSE_CODE.COMMON_ERROR,
      transformError,
    );
  }
}

/**
 * The HTTP response status code for CORS.
 */
export class CorsException extends HttpException {
  constructor() {
    super(
      'Not allowed by CORS',
      EXCEPTION_TYPE.CorsException,
      StatusCodes.FORBIDDEN,
      RESPONSE_CODE.COMMON_CORS_NOT_ALLOW,
    );
  }
}
