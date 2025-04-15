import { Router } from 'express';
import workoutRoutes from './workoutRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/workout-plans', workoutRoutes);

export default router;