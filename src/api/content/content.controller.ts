import type { Request, Response } from 'express';
import { getDailyContent } from './content.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { successResponse } from '../../core/response.js';

export const getDailyContentHandler = asyncHandler(async (req: Request, res: Response) => {
  const content = await getDailyContent();
  return successResponse(res, 200, 'Konten harian berhasil diambil', content);
});
