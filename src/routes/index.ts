import { Router } from 'express';
import authRoutes from '../api/auth/auth.routes.js';
import userRoutes from '../api/users/user.routes.js';
import routineRoutes from '../api/routine/routine.routes.js';
import journalRoutes from '../api/journals/journal.routes.js';
import communityRoutes from '../api/community/community.routes.js';
import aiRoutes from '../api/ai/ai.routes.js';
import educationRoutes from '../api/education/education.routes.js';
import contentRoutes from '../api/content/content.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/routine', routineRoutes);
router.use('/journals', journalRoutes);
router.use('/community', communityRoutes);
router.use('/ai', aiRoutes);
router.use('/education', educationRoutes);
router.use('/content', contentRoutes);

export default router;
