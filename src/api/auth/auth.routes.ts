import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import { googleLoginSchema } from './auth.validation.js';
import { googleLoginHandler } from './auth.controller.js';

const router = Router();

router.post('/google', validate(googleLoginSchema), googleLoginHandler);

export default router;
