import { Router } from "express";
import { workoutScheduleController } from "@/controllers/workoutSchedule";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

router.post('/', authenticateUser, workoutScheduleController.create);

export default router;