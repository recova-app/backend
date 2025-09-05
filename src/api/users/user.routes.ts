import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { getMeHandler } from './user.controller.js';

const router = Router();

router.get('/me', requireAuth, getMeHandler);

export default router;
