import { Router } from 'express';
import workoutController from '@controllers/workoutController';
import { authenticateUser } from '@middlewares/authMiddleware';
import { validateWorkoutPlan } from '@/validators/workoutPlanValidator';
import { handleValidationErrors } from '@/validators/common';

const router = Router();

router.post('/', authenticateUser, validateWorkoutPlan, handleValidationErrors, workoutController.createWorkout);
router.put('/:id', authenticateUser, validateWorkoutPlan, handleValidationErrors, workoutController.updateWorkout);
router.delete('/:id', authenticateUser, workoutController.deleteWorkout);
router.get('/', authenticateUser, workoutController.getAllWorkouts);
router.get('/:id', authenticateUser, workoutController.getWorkout);

export default router;