import { Router } from 'express';
import { workoutLogController } from '@controllers/workoutLogController';
import { authenticateUser } from '@middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateUser, workoutLogController.create);
router.get('/', authenticateUser, workoutLogController.getAll);
router.get('/:id', authenticateUser, workoutLogController.getById);

export default router;
