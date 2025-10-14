import type { Request, Response } from 'express';
import { getCoachResponse, getLatestSummary } from './ai.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const askCoachHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { message: userMessage } = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const coachResponse = await getCoachResponse(userId, userMessage);
  return successResponse(res, 200, 'Respon AI Coach berhasil dibuat', {
    response: coachResponse,
  });
});

export const getSummaryHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const summary = await getLatestSummary(userId);
  return successResponse(res, 200, 'AI Summary berhasil diambil', summary);
});
