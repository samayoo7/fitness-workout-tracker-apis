import { Request, Response } from "express";
import { createWorkoutSchedule, findExistingWorkoutSchedule } from "@services/workoutScheduleService";
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

			const { userId: _, workoutPlanId: __,  ...workoutScheduleData } = workoutSchedule;

			ApiResponse.success(res, workoutScheduleData, 'Workout schedule created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout schedule');
		}
	}
}
