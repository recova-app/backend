import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication invalid: No token provided',
      data: null,
      error: 'Token is required for this route',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Authentication invalid: No token provided',
      data: null,
      error: 'Token is required for this route',
    });
  }

  try {
    const decode = jwt.verify(token, config.jwt.secret) as { id: string };

    req.user = { id: decode.id };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication invalid: Token is not valid',
      data: null,
      error: 'Invalid token',
    });
  }
};
