import type { Request, Response } from 'express';
import { findUserById, updateUserSettings } from './user.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const getMeHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const user = await findUserById(userId);
  if (!user) {
    return errorResponse(res, 404, 'User not found', 'User with this token does not exist');
  }

  return successResponse(res, 200, 'User profile fetched successfully', user);
});

export const updateUserSettingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const dataToUpdate = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const updatedUser = await updateUserSettings(userId, dataToUpdate);
  return successResponse(res, 200, 'User settings updated successfully', updatedUser);
});
