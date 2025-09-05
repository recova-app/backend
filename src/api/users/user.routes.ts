import { Router } from 'express';
import { getMeHandler, updateUserSettingsHandler } from './user.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateUserSettingsSchema } from './user.validation.js';

const router = Router();

router.get('/me', requireAuth, getMeHandler);

router.put('/settings', requireAuth, validate(updateUserSettingsSchema), updateUserSettingsHandler);

export default router;
