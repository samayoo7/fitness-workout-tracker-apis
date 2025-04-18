import { Request, Response } from "express";
import {
	createWorkoutSchedule,
	updateWorkoutSchedule,
	deleteWorkoutSchedule,
	findExistingWorkoutSchedule,
	findWorkoutScheduleById,
	findAllWorkoutSchedules
} from "@services/workoutScheduleService";
import { AuthenticatedRequest } from "@/types/express";
import { ApiResponse } from "@utils/apiResponse";

export const workoutScheduleController = {
	create: async (req: Request, res: Response) => {
		try {
			const { workoutPlanId, scheduledDate, scheduledTime, duration, notes } = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			const existingWorkoutSchedule = await findExistingWorkoutSchedule(userId, scheduledDate);
			if (existingWorkoutSchedule) {
				return ApiResponse.error(res, 'Workout schedule already exists for the given time');
			}

			const workoutSchedule = await createWorkoutSchedule({
				workoutPlanId,
				scheduledDate,
				scheduledTime,
				duration,
				notes,
				userId
			});

			const { userId: _, workoutPlanId: __, ...workoutScheduleData } = workoutSchedule;

			ApiResponse.success(res, workoutScheduleData, 'Workout schedule created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout schedule');
		}
	},
	update: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { workoutPlanId, scheduledDate, scheduledTime, duration, notes } = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			const isWorkoutScheduleExists = await findWorkoutScheduleById(id);
			if (!isWorkoutScheduleExists) {
				return ApiResponse.error(res, 'Workout schedule not found');
			}

			const workoutSchedule = await updateWorkoutSchedule(id, {
				workoutPlanId,
				scheduledDate,
				scheduledTime,
				duration,
				notes,
				userId
			});

			const { userId: _, workoutPlanId: __, ...workoutScheduleData } = workoutSchedule;

			ApiResponse.success(res, workoutScheduleData, 'Workout schedule updated successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to update workout schedule');
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const isWorkoutScheduleExists = await findWorkoutScheduleById(id);
			if (!isWorkoutScheduleExists) {
				return ApiResponse.error(res, 'Workout schedule not found');
			}

			await deleteWorkoutSchedule(id);

			ApiResponse.success(res, null, 'Workout schedule deleted successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to delete workout schedule');
		}
	},
	getAll: async (req: Request, res: Response) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;

			const workoutSchedules = await findAllWorkoutSchedules(userId);

			ApiResponse.success(res, workoutSchedules, 'Workout schedules fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to get all workout schedules');
		}
	},
	getById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const workoutSchedule = await findWorkoutScheduleById(id);
			if (!workoutSchedule) {
				return ApiResponse.error(res, 'Workout schedule not found');
			}

			const { userId: _, workoutPlanId: __, ...workoutScheduleData } = workoutSchedule;

			ApiResponse.success(res, workoutScheduleData, 'Workout schedule fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to get workout schedule by id');
		}
	}
};