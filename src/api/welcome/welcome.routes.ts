import { Router } from 'express';
import { getWelcomeHandler } from './welcome.controller.js';

const router = Router();

router.get('/', getWelcomeHandler);

export default router;
