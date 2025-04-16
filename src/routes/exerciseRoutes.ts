import { Router } from "express";
import { exerciseController } from "@controllers/exerciseController";
import { authenticateUser } from "@middlewares/authMiddleware";

const router = Router();

router.get('/', authenticateUser, exerciseController.getAllExercises);

export default router;
