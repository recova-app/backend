import { Router } from 'express';
import { getDailyContentHandler } from './content.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// router.get('/daily', requireAuth, getDailyContentHandler);
router.get('/daily', getDailyContentHandler);

export default router;
