import type { Application } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

export function setupViewEngine(app: Application) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
}
