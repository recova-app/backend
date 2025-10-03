import { Router } from 'express';
import { createPostHandler, getPostsHandler } from './community.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createPostSchema } from './community.validation.js';

const router = Router();

router.get('/', requireAuth, getPostsHandler);

router.post('/', requireAuth, validate(createPostSchema), createPostHandler);

export default router;
