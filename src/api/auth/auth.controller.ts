import type { Request, Response } from 'express';
import { saveOnboardingData, verifyGoogleTokenAndLogin } from './auth.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const googleLoginHandler = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const jwtToken = await verifyGoogleTokenAndLogin(token);

  return successResponse(res, 200, 'Login successful', { token: jwtToken });
});

export const onboardingHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const onboardingData = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const profile = await saveOnboardingData(userId, onboardingData);

  return successResponse(res, 201, 'Onboarding data saved successfully', profile);
});
