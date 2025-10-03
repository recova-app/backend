import type { Request, Response } from 'express';
import { verifyGoogleTokenAndLogin } from './auth.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { successResponse } from '../../core/response.js';

export const googleLoginHandler = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const jwtToken = await verifyGoogleTokenAndLogin(token);

  return successResponse(res, 200, 'Login successful', { token: jwtToken });
});
