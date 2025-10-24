import { Router } from 'express';
import { googleLoginHandler, onboardingHandler } from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { googleLoginSchema, onboardingSchema } from './auth.validation.js';

const router = Router();

router.post('/google', validate(googleLoginSchema), googleLoginHandler);

// router.post('/onboarding', requireAuth, validate(onboardingSchema), onboardingHandler);
router.post('/onboarding', validate(onboardingSchema), onboardingHandler);

export default router;
