import type { Request, Response } from 'express';
import { getCoachResponse } from './ai.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const askCoachHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { message: userMessage } = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const coachResponse = await getCoachResponse(userId, userMessage);
  return successResponse(res, 200, 'AI Coach response generated successfully', {
    response: coachResponse,
  });
});
