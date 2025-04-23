import { Router } from "express";
import { workoutScheduleController } from "@controllers/workoutScheduleController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { handleValidationErrors } from "@validators/common";
import { validateWorkoutSchedule } from "@validators/workoutScheduleValidator";

const router = Router();

router.post('/', authenticateUser, validateWorkoutSchedule, handleValidationErrors, workoutScheduleController.create);
router.put('/:id', authenticateUser, validateWorkoutSchedule, handleValidationErrors, workoutScheduleController.update);
router.get('/', authenticateUser, workoutScheduleController.getAll);
router.get('/:id', authenticateUser, workoutScheduleController.getById);
router.delete('/:id', authenticateUser, workoutScheduleController.delete);

export default router;