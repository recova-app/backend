import type { Request, Response } from 'express';

export function getWelcomeHandler(_req: Request, res: Response) {
  res.render('web/index', {
    documentationUrl: 'https://documenter.getpostman.com/view/38960737/2sB3QJQBZ8',
  });
}
