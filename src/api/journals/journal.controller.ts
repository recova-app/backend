import type { Request, Response } from 'express';
import { createJournalEntry, findJournalsByUserId } from './journal.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const createJournalHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id || req.body.userId; // Temporary support for userId in body for testing purposes
  const { content } = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const journal = await createJournalEntry(userId, content);
  return successResponse(res, 201, 'Entri jurnal berhasil dibuat', journal);
});

export const getJournalsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id || req.body.userId; // Temporary support for userId in body for testing purposes
  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const journals = await findJournalsByUserId(userId);
  return successResponse(res, 200, 'Jurnal berhasil diambil', journals);
});
