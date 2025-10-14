import { Router } from 'express';
import { askCoachHandler, getSummaryHandler, onboardingAnalysisHandler } from './ai.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { askCoachSchema } from './ai.validation.js';

const router = Router();

router.post('/ask-coach', requireAuth, validate(askCoachSchema), askCoachHandler);

router.get('/summary', requireAuth, getSummaryHandler);

router.post('/onboarding-analysis', onboardingAnalysisHandler);

export default router;
