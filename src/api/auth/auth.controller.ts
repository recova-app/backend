import type { Request, Response } from 'express';
import { saveOnboardingData, verifyGoogleTokenAndLogin } from './auth.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const googleLoginHandler = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await verifyGoogleTokenAndLogin(token);

  return successResponse(res, 200, 'Login berhasil', result);
});

export const onboardingHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id || req.body.userId; // Temporary support for userId in body for testing purposes
  const onboardingData = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const profile = await saveOnboardingData(userId, onboardingData);

  return successResponse(res, 201, 'Data onboarding berhasil disimpan', profile);
});
