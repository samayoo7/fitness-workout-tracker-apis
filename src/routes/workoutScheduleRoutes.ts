import { Router } from "express";
import { workoutScheduleController } from "@/controllers/workoutSchedule";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

router.post('/', authenticateUser, workoutScheduleController.create);
router.get('/', authenticateUser, workoutScheduleController.getAll);
router.get('/:id', authenticateUser, workoutScheduleController.getById);
router.put('/:id', authenticateUser, workoutScheduleController.update);
router.delete('/:id', authenticateUser, workoutScheduleController.delete);

export default router;