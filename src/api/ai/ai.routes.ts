import { Router } from 'express';
import {
  askCoachHandler,
  getChatHistoryHandler,
  getSummaryHandler,
  onboardingAnalysisHandler,
} from './ai.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { askCoachSchema } from './ai.validation.js';
import { onboardingAnalysisLimiter } from '../../middleware/rateLimiter.middleware.js';

const router = Router();

// router.post('/ask-coach', requireAuth, validate(askCoachSchema), askCoachHandler);
router.post('/ask-coach', validate(askCoachSchema), askCoachHandler);

// router.get('/chat-history', requireAuth, getChatHistoryHandler);
router.get('/chat-history', getChatHistoryHandler);

// router.get('/summary', requireAuth, getSummaryHandler);
router.get('/summary', getSummaryHandler);

router.post('/onboarding-analysis', onboardingAnalysisLimiter, onboardingAnalysisHandler);

export default router;
