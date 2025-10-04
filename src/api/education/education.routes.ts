import { Router } from 'express';
import { getEducationContentsHandler } from './education.controller.js';

const router = Router();

router.get('/', getEducationContentsHandler);

export default router;
