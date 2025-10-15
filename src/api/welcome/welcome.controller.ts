import type { Request, Response } from 'express';
import config from '../../config/index.js';

export function getWelcomeHandler(_req: Request, res: Response) {
  res.render('web/index', {
    documentationUrl: config.docsUrl,
  });
}
