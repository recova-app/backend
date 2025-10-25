import { Router } from 'express';
import {
  getMeHandler,
  resetUserDataHandler,
  updateUserSettingsHandler,
} from './user.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateUserSettingsSchema } from './user.validation.js';

const router = Router();

// router.get('/me', requireAuth, getMeHandler);
router.get('/me', getMeHandler);

// router.put('/settings', requireAuth, validate(updateUserSettingsSchema), updateUserSettingsHandler);
router.put('/settings', validate(updateUserSettingsSchema), updateUserSettingsHandler);

// router.delete('/me/reset-data', requireAuth, resetUserDataHandler);
router.delete('/me/reset-data', resetUserDataHandler);

export default router;
