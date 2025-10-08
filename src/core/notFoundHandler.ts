import { type Request, type Response, type NextFunction } from 'express';

class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new HttpError(`Route Not Found - ${req.method} ${req.originalUrl}`, 404);
  next(error);
}
