import { Router } from 'express';
import { getEducationContentsHandler } from './education.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// router.get('/', requireAuth, getEducationContentsHandler);
router.get('/', getEducationContentsHandler);

export default router;
