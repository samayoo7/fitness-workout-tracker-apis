import { Router } from 'express';
import { statisticsController } from '@/controllers/statisticsController';
import { authenticateUser } from '@middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get workout statistics summary
 *     description: Retrieve workout statistics and progress summary for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalWorkouts:
 *                       type: number
 *                       example: 25
 *                     completedWorkouts:
 *                       type: number
 *                       example: 20
 *                     totalExercises:
 *                       type: number
 *                       example: 150
 *                     weeklyProgress:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                           workoutsCompleted:
 *                             type: number
 *                     monthlyProgress:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                           workoutsCompleted:
 *                             type: number
 *                     exerciseProgress:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           exerciseId:
 *                             type: string
 *                           name:
 *                             type: string
 *                           maxWeight:
 *                             type: number
 *                           maxReps:
 *                             type: number
 *                 message:
 *                   type: string
 *                   example: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateUser, statisticsController.getStatsSummary);

export default router;
