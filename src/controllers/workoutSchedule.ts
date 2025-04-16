import { Request, Response } from "express";
import { createWorkoutSchedule } from "@/services/workoutScheduleService";
import { AuthenticatedRequest } from "@/types/express";
import { ApiResponse } from "@/utils/apiResponse";

export const workoutScheduleController = {
	create: async (req: Request, res: Response) => {
		try {
			const { workoutPlanId, scheduledDate, scheduledTime, duration, notes } = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			const workoutSchedule = await createWorkoutSchedule({
				workoutPlanId,
				scheduledDate,
				scheduledTime,
				duration,
				notes,
				userId
			});

			ApiResponse.success(res, workoutSchedule, 'Workout schedule created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout schedule');
		}
	}
}
