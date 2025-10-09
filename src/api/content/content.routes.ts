import { Router } from 'express';
import { getDailyContentHandler } from './content.controller.js';

const router = Router();

router.get('/daily', getDailyContentHandler);

export default router;
