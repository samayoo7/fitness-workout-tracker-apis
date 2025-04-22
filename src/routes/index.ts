import { Router } from 'express';
import authRoutes from './authRoutes';
import exerciseRoutes from './exerciseRoutes';
import workoutRoutes from './workoutRoutes';
import workoutScheduleRoutes from './workoutScheduleRoutes';
import workoutLogRoutes from './workoutLogRoutes';
import statisticsRoutes from './statisticsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workout-plans', workoutRoutes);
router.use('/workout-schedules', workoutScheduleRoutes);
router.use('/workout-logs', workoutLogRoutes);
router.use('/statistics', statisticsRoutes);

export default router;
