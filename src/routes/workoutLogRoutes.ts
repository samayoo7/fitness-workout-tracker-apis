import { Router } from 'express';
import { workoutLogController } from '@controllers/workoutLogController';
import { authenticateUser } from '@middlewares/authMiddleware';
import { validateWorkoutLog } from '@validators/workoutLogValidator';
import { handleValidationErrors } from '@validators/common';

const router = Router();

router.post('/', authenticateUser, validateWorkoutLog, handleValidationErrors, workoutLogController.create);
router.get('/', authenticateUser, workoutLogController.getAll);
router.get('/:id', authenticateUser, workoutLogController.getById);

export default router;
