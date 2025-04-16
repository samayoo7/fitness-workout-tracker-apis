import { Request, Response } from "express";
import { findAll } from "@services/exerciseService";
import { ApiResponse } from "@utils/apiResponse";

export const exerciseController = {
	getAllExercises: async (_: Request, res: Response) => {
		try {
			const exercises = await findAll();
			ApiResponse.success(res, exercises, 'Exercises fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to fetch exercises');
		}
	}
}