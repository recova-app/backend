import type { Request, Response } from 'express';
import { saveOnboardingData, verifyGoogleTokenAndLogin } from './auth.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const googleLoginHandler = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const jwtToken = await verifyGoogleTokenAndLogin(token);

  return successResponse(res, 200, 'Login berhasil', { token: jwtToken });
});

export const onboardingHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
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
