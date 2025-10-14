import type { Request, Response } from 'express';
import { analyzeOnboardingAnswers, getCoachResponse, getLatestSummary } from './ai.service.js';
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

export const onboardingAnalysisHandler = asyncHandler(async (req: Request, res: Response) => {
  const { answers } = req.body;
  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({
      message: 'Kesalahan validasi',
      data: null,
      error: 'Data jawaban tidak boleh kosong',
    });
  }

  const analysis = await analyzeOnboardingAnswers(answers);
  return successResponse(res, 200, 'Analisis onboarding berhasil dilakukan', analysis);
});
