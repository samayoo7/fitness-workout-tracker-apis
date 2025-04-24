import { Router } from 'express';
import { workoutLogController } from '@controllers/workoutLogController';
import { authenticateUser } from '@middlewares/authMiddleware';
import { validateWorkoutLog } from '@validators/workoutLogValidator';
import { handleValidationErrors } from '@validators/common';

const router = Router();

/**
 * @swagger
 * /api/workout-logs:
 *   post:
 *     tags:
 *       - Workout Logs
 *     summary: Create a new workout log
 *     description: Log a completed workout session
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workoutId
 *               - exercises
 *             properties:
 *               workoutId:
 *                 type: string
 *                 description: ID of the completed workout
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - exerciseId
 *                     - sets
 *                   properties:
 *                     exerciseId:
 *                       type: string
 *                     sets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reps:
 *                             type: number
 *                             example: 12
 *                           weight:
 *                             type: number
 *                             example: 50
 *                           notes:
 *                             type: string
 *                             example: Felt strong today
 *               notes:
 *                 type: string
 *                 example: Great workout session
 *     responses:
 *       201:
 *         description: Workout log created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request body
 */
router.post('/', authenticateUser, validateWorkoutLog, handleValidationErrors, workoutLogController.create);

/**
 * @swagger
 * /api/workout-logs:
 *   get:
 *     tags:
 *       - Workout Logs
 *     summary: Get all workout logs
 *     description: Retrieve all workout logs for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   workoutId:
 *                     type: string
 *                   exercises:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         exerciseId:
 *                           type: string
 *                         sets:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               reps:
 *                                 type: number
 *                               weight:
 *                                 type: number
 *                               notes:
 *                                 type: string
 *                   notes:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateUser, workoutLogController.getAll);

/**
 * @swagger
 * /api/workout-logs/{id}:
 *   get:
 *     tags:
 *       - Workout Logs
 *     summary: Get a specific workout log
 *     description: Retrieve a specific workout log by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 workoutId:
 *                   type: string
 *                 exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       exerciseId:
 *                         type: string
 *                       sets:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             reps:
 *                               type: number
 *                             weight:
 *                               type: number
 *                             notes:
 *                               type: string
 *                 notes:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout log not found
 */
router.get('/:id', authenticateUser, workoutLogController.getById);

export default router;
