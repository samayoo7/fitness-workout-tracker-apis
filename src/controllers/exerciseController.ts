import { Request, Response } from "express";
import { findAll } from "@services/exerciseService";
import { ApiResponse } from "@utils/apiResponse";
import { CACHE_TTL, cacheUtils } from "@utils/redisCache";

export const exerciseController = {
	getAllExercises: async (req: Request, res: Response) => {
		try {
			const query = req.query.search as string;
			const filters = req.query.filters as {
				category?: string;
				muscleGroup?: string;
				difficulty?: string;
			};

			// const cacheKey = 'exercises:all';
			// const cachedExercises = await cacheUtils.get(cacheKey);
			// if (cachedExercises) {
			// 	ApiResponse.success(res, cachedExercises, 'Exercises fetched successfully');
			// 	return;
			// }

			const exercises = await findAll(query);

			try {
				await cacheUtils.set('exercises:all', exercises, CACHE_TTL.EXERCISE);
			} catch (cacheError) {
				console.error('Cache clear error:', cacheError);
			}

			ApiResponse.success(res, exercises, 'Exercises fetched successfully');
		} catch (error) {
			ApiResponse.error(res, 'Failed to fetch exercises');
		}
	}
};
