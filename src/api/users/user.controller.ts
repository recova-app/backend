import type { Request, Response } from 'express';
import { findUserById, updateUserSettings } from './user.service.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const getMeHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const user = await findUserById(userId);
  if (!user) {
    return errorResponse(
      res,
      404,
      'Pengguna tidak ditemukan',
      'Pengguna dengan ID yang diberikan tidak ditemukan'
    );
  }

  return successResponse(res, 200, 'Profil pengguna berhasil diambil', user);
});

export const updateUserSettingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const dataToUpdate = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const updatedUser = await updateUserSettings(userId, dataToUpdate);
  return successResponse(res, 200, 'Pengaturan pengguna berhasil diperbarui', updatedUser);
});
