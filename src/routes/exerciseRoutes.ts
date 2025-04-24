import { Router } from "express";
import { exerciseController } from "@controllers/exerciseController";
import { authenticateUser } from "@middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     tags:
 *       - Exercises
 *     summary: Get all exercises
 *     description: Retrieve a list of all available exercises
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: Bench Press
 *                       description:
 *                         type: string
 *                         example: A compound exercise that works the chest
 *                       muscleGroup:
 *                         type: string
 *                         example: Chest
 *                       equipment:
 *                         type: string
 *                         example: Barbell
 *                       difficulty:
 *                         type: string
 *                         enum: [Beginner, Intermediate, Advanced]
 *                         example: Intermediate
 *                 message:
 *                   type: string
 *                   example: Exercises retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateUser, exerciseController.getAllExercises);

export default router;
