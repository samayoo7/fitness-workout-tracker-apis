import { Router } from 'express';
import authRoutes from './authRoutes';
import exerciseRoutes from './exerciseRoutes';
import workoutRoutes from './workoutRoutes';
import workoutScheduleRoutes from './workoutScheduleRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workout-plans', workoutRoutes);
router.use('/workout-schedules', workoutScheduleRoutes);

export default router;