import { Router } from "express";
import { workoutScheduleController } from "@controllers/workoutScheduleController";
import { authenticateUser } from "@middlewares/authMiddleware";
import { cacheMiddleware } from "@middlewares/cacheMiddleware";
import { handleValidationErrors } from "@validators/common";
import { validateWorkoutSchedule } from "@validators/workoutScheduleValidator";

const router = Router();

/**
 * @swagger
 * /api/workout-schedules:
 *   post:
 *     tags:
 *       - Workout Schedules
 *     summary: Create a new workout schedule
 *     description: Create a new workout schedule with specific days and times
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
 *               - scheduledDays
 *             properties:
 *               workoutId:
 *                 type: string
 *                 description: ID of the workout to schedule
 *               scheduledDays:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - day
 *                     - time
 *                   properties:
 *                     day:
 *                       type: string
 *                       enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                       example: Monday
 *                     time:
 *                       type: string
 *                       format: time
 *                       example: "09:00"
 *               notes:
 *                 type: string
 *                 example: Morning workout routine
 *     responses:
 *       201:
 *         description: Workout schedule created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request body
 */
router.post('/', authenticateUser, validateWorkoutSchedule, handleValidationErrors, cacheMiddleware.clearWorkoutScheduleCache, workoutScheduleController.create);

/**
 * @swagger
 * /api/workout-schedules/{id}:
 *   put:
 *     tags:
 *       - Workout Schedules
 *     summary: Update a workout schedule
 *     description: Update an existing workout schedule
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
 *               workoutId:
 *                 type: string
 *               scheduledDays:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                     time:
 *                       type: string
 *                       format: time
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Workout schedule updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.put('/:id', authenticateUser, validateWorkoutSchedule, handleValidationErrors, cacheMiddleware.clearWorkoutScheduleCache, workoutScheduleController.update);

/**
 * @swagger
 * /api/workout-schedules:
 *   get:
 *     tags:
 *       - Workout Schedules
 *     summary: Get all workout schedules
 *     description: Retrieve all workout schedules for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout schedules
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
 *                   scheduledDays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         day:
 *                           type: string
 *                         time:
 *                           type: string
 *                           format: time
 *                   notes:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateUser, cacheMiddleware.cacheWorkoutSchedule, workoutScheduleController.getAll);

/**
 * @swagger
 * /api/workout-schedules/{id}:
 *   get:
 *     tags:
 *       - Workout Schedules
 *     summary: Get a specific workout schedule
 *     description: Retrieve a specific workout schedule by ID
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
 *         description: Workout schedule details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.get('/:id', authenticateUser, cacheMiddleware.cacheWorkoutSchedule, workoutScheduleController.getById);

/**
 * @swagger
 * /api/workout-schedules/{id}:
 *   delete:
 *     tags:
 *       - Workout Schedules
 *     summary: Delete a workout schedule
 *     description: Delete a specific workout schedule by ID
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
 *         description: Workout schedule deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.delete('/:id', authenticateUser, cacheMiddleware.clearWorkoutScheduleCache, workoutScheduleController.delete);

export default router;
