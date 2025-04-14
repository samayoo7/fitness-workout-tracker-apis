import { Request, Response } from "express";
import { createOne, findFirst } from "@/services/workoutService";
import { ApiResponse } from "@utils/apiResponse";
import { AuthenticatedRequest } from "@/types/express";

const workoutController = {
	createWorkout: async (req: AuthenticatedRequest, res: Response) => {
		try {
			const { name, description, items } = req.body;

			if (!req.userId) {
				ApiResponse.unauthorized(res, 'User not authenticated');
				return;
			}

			const userId = req.userId;
			const isPlanExists = await findFirst(name, userId);
			if (isPlanExists) {
				ApiResponse.badRequest(res, 'Workout plan already exists');
				return;
			}

			const newPlan = await createOne(userId, { name, description, items });

			ApiResponse.created(res, newPlan, 'Workout plan created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout plan');
		}
	}
};

export default workoutController;
