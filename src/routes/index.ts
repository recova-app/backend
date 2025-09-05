import { Router } from 'express';
import authRoutes from '../api/auth/auth.routes.js';
import userRoutes from '../api/users/user.routes.js';
import routineRoutes from '../api/routine/routine.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/routine', routineRoutes);

export default router;
