import { type Request, type Response, type NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Route Not Found - ${req.method} ${req.originalUrl}`);
  (error as any).status = 404;

  next(error);
}
