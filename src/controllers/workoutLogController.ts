import { Request, Response } from 'express';
import {
	createWorkoutLog,
	findAllWorkoutLogs,
	findOverlappingWorkoutLogs,
	findWorkoutLogById,
	findWorkoutLogByScheduleId
} from '@services/workoutLogService';
import { markWorkoutScheduleAsCompleted } from '@services/workoutScheduleService';
import { AuthenticatedRequest } from '@/types/express';
import { ApiResponse } from '@utils/apiResponse';

export const workoutLogController = {
	create: async (req: Request, res: Response) => {
		try {
			const { workoutPlanId, workoutScheduleId, startTime, endTime, exercises, notes, rating } = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			// Check if workout log already exists for this schedule
			if (workoutScheduleId) {
				const existingLog = await findWorkoutLogByScheduleId(workoutScheduleId);
				if (existingLog) {
					return ApiResponse.error(res, 'Workout log already exists for this schedule');
				}
			}

			// Check for overlapping workouts
			const overlappingWorkout = await findOverlappingWorkoutLogs({
				userId,
				startTime,
				endTime,
				excludeScheduleId: workoutScheduleId
			});

			if (overlappingWorkout) {
				return ApiResponse.error(res, 'Another workout log exists for this time period');
			}

			if (workoutScheduleId) {
				await markWorkoutScheduleAsCompleted(workoutScheduleId);
			}

			const workoutLog = await createWorkoutLog({
				workoutPlanId,
				workoutScheduleId,
				startTime,
				endTime,
				exercises,
				notes,
				rating,
				userId
			});

			ApiResponse.success(res, workoutLog, 'Workout log created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout log');
		}
	},
	getAll: async (req: Request, res: Response) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;

			const workoutLogs = await findAllWorkoutLogs(userId);

			ApiResponse.success(res, workoutLogs, 'Workout logs retrieved successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to retrieve workout logs');
		}
	},
	getById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const workoutLog = await findWorkoutLogById(id);
			if (!workoutLog) {
				return ApiResponse.error(res, 'Workout log not found');
			}

			const { userId: _, workoutPlanId: __, workoutScheduleId: ___, ...rest } = workoutLog;

			ApiResponse.success(res, rest, 'Workout log retrieved successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to retrieve workout log');
		}
	}
};
