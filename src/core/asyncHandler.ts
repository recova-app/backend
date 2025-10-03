import type { Request, Response, NextFunction } from 'express';

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function asyncHandler(fn: ControllerFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
