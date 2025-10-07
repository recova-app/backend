import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../core/response.js';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error('[ErrorHandler]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, statusCode, message, err.stack ? err.stack : undefined);
}
