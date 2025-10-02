import { Router } from 'express';
import { createJournalHandler, getJournalsHandler } from './journal.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createJournalSchema } from './journal.validation.js';

const router = Router();

router.get('/', requireAuth, getJournalsHandler);

router.post('/', requireAuth, validate(createJournalSchema), createJournalHandler);

export default router;
