import type { Request, Response } from 'express';
import { verifyGoogleTokenAndLogin } from './auth.service.js';

export async function googleLoginHandler(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const jwtToken = await verifyGoogleTokenAndLogin(token);

    return res.status(200).json({
      message: 'Login successful',
      data: { token: jwtToken },
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(401).json({
      message: 'Authentication failed',
      data: null,
      error: errorMessage,
    });
  }
}
