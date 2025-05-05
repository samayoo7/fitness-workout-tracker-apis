import { Router } from 'express';
import workoutController from '@controllers/workoutController';
import { authenticateUser } from '@middlewares/authMiddleware';
import { cacheMiddleware } from '@middlewares/cacheMiddleware';
import { validateWorkoutPlan } from '@validators/workoutPlanValidator';
import { handleValidationErrors } from '@validators/common';

const router = Router();

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     tags:
 *       - Workouts
 *     summary: Create a new workout
 *     description: Create a new workout plan with exercises
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - exercises
 *             properties:
 *               name:
 *                 type: string
 *                 example: Full Body Workout
 *               description:
 *                 type: string
 *                 example: Complete full body workout routine
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - exerciseId
 *                     - sets
 *                     - reps
 *                   properties:
 *                     exerciseId:
 *                       type: string
 *                     sets:
 *                       type: number
 *                       example: 3
 *                     reps:
 *                       type: number
 *                       example: 12
 *                     weight:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request body
 */
router.post('/', authenticateUser, validateWorkoutPlan, handleValidationErrors, cacheMiddleware.clearWorkoutCache, workoutController.createWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     tags:
 *       - Workouts
 *     summary: Update a workout
 *     description: Update an existing workout plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exerciseId:
 *                       type: string
 *                     sets:
 *                       type: number
 *                     reps:
 *                       type: number
 *                     weight:
 *                       type: number
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.put('/:id', authenticateUser, validateWorkoutPlan, handleValidationErrors, cacheMiddleware.clearWorkoutCache, workoutController.updateWorkout);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get all workouts
 *     description: Retrieve all workouts for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   exercises:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         exerciseId:
 *                           type: string
 *                         sets:
 *                           type: number
 *                         reps:
 *                           type: number
 *                         weight:
 *                           type: number
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateUser, cacheMiddleware.cacheWorkout, workoutController.getAllWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get a specific workout
 *     description: Retrieve a specific workout by ID
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
 *         description: Workout details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.get('/:id', authenticateUser, cacheMiddleware.cacheWorkout, workoutController.getWorkout);

/**
 * @swagger
 * /api/workouts/{id}/status:
 *   patch:
 *     tags:
 *       - Workouts
 *     summary: Toggle workout active status
 *     description: Toggle the active status of a workout
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
 *         description: Workout status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.patch('/:id/status', authenticateUser, cacheMiddleware.clearWorkoutCache, workoutController.toggleActive);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     tags:
 *       - Workouts
 *     summary: Delete a workout
 *     description: Delete a specific workout by ID
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
 *         description: Workout deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.delete('/:id', authenticateUser, cacheMiddleware.clearWorkoutCache, workoutController.deleteWorkout);

export default router;