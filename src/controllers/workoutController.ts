import { Request, Response } from "express";
import { createOne, findFirstById, findFirstByName, updateOne, deleteOne, findAll } from "@/services/workoutService";
import { AuthenticatedRequest } from "@/types/express";
import { UpdateWorkoutPlan } from "@/types/workout";
import { ApiResponse } from "@utils/apiResponse";

const workoutController = {
	createWorkout: async (req: Request, res: Response) => {
		try {
			const { name, description, items } = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			const isPlanExists = await findFirstByName(userId, name);
			if (isPlanExists) {
				ApiResponse.badRequest(res, 'Workout plan already exists');
				return;
			}

			const newPlan = await createOne(userId, { name, description, items });

			ApiResponse.created(res, newPlan, 'Workout plan created successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to create workout plan');
		}
	},
	updateWorkout: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const updateData: Partial<UpdateWorkoutPlan> = req.body;
			const userId = (req as AuthenticatedRequest).userId;

			// Validate if plan exists and belongs to user
			const existingPlan = await findFirstById(userId, id);
			if (!existingPlan) {
				ApiResponse.notFound(res, 'Workout plan not found');
				return;
			}

			// If name is being updated, check for duplicates
			if (updateData.name && updateData.name !== existingPlan.name) {
				const isPlanExists = await findFirstByName(userId, updateData.name);
				if (isPlanExists) {
					ApiResponse.badRequest(res, 'Workout plan with this name already exists');
					return;
				}
			}

			const updatedPlan = await updateOne(id, updateData);
			ApiResponse.success(res, updatedPlan, 'Workout plan updated successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to update workout plan');
		}
	},
	deleteWorkout: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const userId = (req as AuthenticatedRequest).userId;

			const existingPlan = await findFirstById(userId, id);
			if (!existingPlan) {
				ApiResponse.notFound(res, 'Workout plan not found');
				return;
			}

			await deleteOne(id);
			ApiResponse.success(res, null, 'Workout plan deleted successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to delete workout plan');
		}
	},
	getAllWorkouts: async (req: Request, res: Response) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			const workouts = await findAll(userId);
			ApiResponse.success(res, workouts, 'Workouts fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to get all workouts');
		}
	},
	getWorkout: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const userId = (req as AuthenticatedRequest).userId;

			const workout = await findFirstById(userId, id);
			if (!workout) {
				ApiResponse.notFound(res, 'Workout plan not found');
				return;
			}

			ApiResponse.success(res, workout, 'Workout plan fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to get workout plan');
		}
	},
	toggleActive: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const userId = (req as AuthenticatedRequest).userId;

			const workout = await findFirstById(userId, id);
			if (!workout) {
				ApiResponse.notFound(res, 'Workout plan not found');
				return;
			}

			await updateOne(id, { isActive: !workout.isActive });
			ApiResponse.success(res, null, 'Workout plan active status toggled successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to toggle active status');
		}
	}
};

export default workoutController;
