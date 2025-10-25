import { Router } from 'express';
import {
  addLikeHandler,
  createCommentHandler,
  createPostHandler,
  getPostsHandler,
} from './community.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createCommentSchema, createPostSchema } from './community.validation.js';

const router = Router();

// router.get('/', requireAuth, getPostsHandler);
router.get('/', getPostsHandler);

// router.post('/', requireAuth, validate(createPostSchema), createPostHandler);
router.post('/', validate(createPostSchema), createPostHandler);

// router.post('/:postId/comments', requireAuth, validate(createCommentSchema), createCommentHandler);
router.post('/:postId/comments', validate(createCommentSchema), createCommentHandler);

// router.post('/:postId/like', requireAuth, addLikeHandler);
router.post('/:postId/like', addLikeHandler);

export default router;
