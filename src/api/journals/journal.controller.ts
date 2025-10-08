import type { Request, Response } from 'express';
import { createJournalEntry, findJournalsByUserId } from './journal.service.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const createJournalHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { content } = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const journal = await createJournalEntry(userId, content);
  return successResponse(res, 201, 'Journal entry created successfully', journal);
});

export const getJournalsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const journals = await findJournalsByUserId(userId);
  return successResponse(res, 200, 'Journals fetched successfully', journals);
});
