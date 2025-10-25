import { Router } from 'express';
import {
  dailyCheckinHandler,
  getRelapsesHandler,
  getStatisticsHandler,
} from './routine.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { dailyCheckinSchema } from './routine.validation.js';

const router = Router();

// router.post('/checkin', requireAuth, validate(dailyCheckinSchema), dailyCheckinHandler);
router.post('/checkin', validate(dailyCheckinSchema), dailyCheckinHandler);

// router.get('/statistics', requireAuth, getStatisticsHandler);
router.get('/statistics', getStatisticsHandler);

// router.get('/relapses', requireAuth, getRelapsesHandler);
router.get('/relapses', getRelapsesHandler);

export default router;
