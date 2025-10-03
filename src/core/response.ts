import type { Response } from 'express';

interface ApiResponse<T = any> {
  message: string;
  data?: T | null;
  error?: string | null;
}

export function successResponse<T>(res: Response, statusCode: number, message: string, data?: T) {
  const response: ApiResponse<T> = {
    message,
    data: data ?? null,
    error: null,
  };

  return res.status(statusCode).json(response);
}

export function errorResponse(res: Response, statusCode: number, message: string, error?: string) {
  const response: ApiResponse = {
    message,
    data: null,
    error: error ?? null,
  };

  return res.status(statusCode).json(response);
}
