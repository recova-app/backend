import type { Request, Response } from 'express';
import { findAllEducationContents } from './education.service.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { successResponse } from '../../core/response.js';

export const getEducationContentsHandler = asyncHandler(async (req: Request, res: Response) => {
  const contents = await findAllEducationContents();
  return successResponse(res, 200, 'Education contents fetched successfully', contents);
});
