import type { Request, Response } from 'express';
import { getUserStatistics, processDailyCheckin } from './routine.service.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const dailyCheckinHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const checkinData = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const checkinResult = await processDailyCheckin(userId, checkinData);
  return successResponse(res, 200, 'Check-in berhasil', checkinResult);
});

export const getStatisticsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const statistics = await getUserStatistics(userId);
  return successResponse(res, 200, 'Statistik berhasil diambil', statistics);
});
