import type { Request, Response } from 'express';
import { processDailyCheckin } from './routine.service.js';

export async function dailyCheckinHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { mood, isSuccessful } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    const checkinResult = await processDailyCheckin(userId, mood, isSuccessful);

    return res.status(200).json({
      message: 'Check-in successful',
      data: checkinResult,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    if (errorMessage.includes('already checked in')) {
      return res.status(409).json({
        message: errorMessage,
        data: null,
        error: 'Duplicate entry',
      });
    }

    return res.status(500).json({
      message: 'Failed to process check-in',
      data: null,
      error: errorMessage,
    });
  }
}
