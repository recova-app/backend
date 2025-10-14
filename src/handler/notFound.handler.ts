import { type Request, type Response, type NextFunction } from 'express';

class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new HttpError(`Rute tidak ditemukan - ${req.method} ${req.originalUrl}`, 404);
  next(error);
}
