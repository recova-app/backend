import type { Request, Response } from 'express';
import { findUserById } from './user.service.js';

export async function getMeHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: null,
        error: 'User with this token does not exist',
      });
    }

    return res.status(200).json({
      message: 'User profile fetched successfully',
      data: user,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch user profile',
      data: null,
      error: 'Internal Server Error',
    });
  }
}
