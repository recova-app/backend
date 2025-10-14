import type { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod/v4';

export const validate =
  (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(e => e.message).join(', ');

        return res.status(400).json({
          message: `Validation error: ${errorMessages}`,
          data: null,
          error: error.issues,
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
        data: null,
        error: error,
      });
    }
  };
