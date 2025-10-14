import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Gagal melakukan autentikasi: Token tidak ditemukan',
      data: null,
      error: 'Token diperlukan untuk rute ini',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Gagal melakukan autentikasi: Token tidak ditemukan',
      data: null,
      error: 'Token diperlukan untuk rute ini',
    });
  }

  try {
    const decode = jwt.verify(token, config.jwt.secret) as { id: string };

    req.user = { id: decode.id };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Gagal melakukan autentikasi: Token tidak valid',
      data: null,
      error: `Token tidak valid: ${(error as Error).message}`,
    });
  }
};
