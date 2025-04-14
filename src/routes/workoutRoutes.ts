import { Router } from 'express';
import workoutController from '@controllers/workoutController';
import { authenticateUser } from '@middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateUser, workoutController.createWorkout);

export default router;