import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@/types/express";
import { cacheUtils } from "@utils/redisCache";
import { ApiResponse } from "@utils/apiResponse";

export const cacheMiddleware = {
	cacheWorkout: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			const cacheKey = `workout:${userId}:${req.params.id || 'all'}`;

			const cachedData = await cacheUtils.get(cacheKey);
			if (cachedData) {
				ApiResponse.success(res, cachedData, 'Data retrieved from cache');
				return;
			}

			next();
		}
		catch (error) {
			next(error);
		}
	},
	clearWorkoutCache: async (req: Request, _: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			await cacheUtils.delByPattern(`workout:${userId}:*`);
			next();
		} catch (error) {
			next(error);
		}
	},
	cacheWorkoutSchedule: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			const cacheKey = `workoutSchedule:${userId}:${req.params.id || 'all'}`;

			const cachedData = await cacheUtils.get(cacheKey);
			if (cachedData) {
				ApiResponse.success(res, cachedData, 'Data retrieved from cache');
				return;
			}

			next();
		}
		catch (error) {
			next(error);
		}
	},
	clearWorkoutScheduleCache: async (req: Request, _: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			await cacheUtils.delByPattern(`workoutSchedule:${userId}:*`);
			next();
		} catch (error) {
			next(error);
		}
	},
	cacheWorkoutLog: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			const cacheKey = `workoutLog:${userId}:${req.params.id || 'all'}`;

			const cachedData = await cacheUtils.get(cacheKey);
			if (cachedData) {
				ApiResponse.success(res, cachedData, 'Data retrieved from cache');
				return;
			}

			next();
		}
		catch (error) {
			next(error);
		}
	},
	clearWorkoutLogCache: async (req: Request, _: Response, next: NextFunction) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			await cacheUtils.delByPattern(`workoutLog:${userId}:*`);
			next();
		} catch (error) {
			next(error);
		}
	}
};
