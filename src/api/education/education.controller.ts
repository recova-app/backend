import type { Request, Response } from 'express';
import { findAllEducationContents } from './education.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { successResponse } from '../../core/response.js';

export const getEducationContentsHandler = asyncHandler(async (req: Request, res: Response) => {
  const contents = await findAllEducationContents();
  return successResponse(res, 200, 'Konten edukasi berhasil diambil', contents);
});
