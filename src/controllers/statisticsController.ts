import { Request, Response } from "express";
import { getStatsForPeriod } from "@services/statisticsService";
import { AuthenticatedRequest } from "@/types/express";
import { ApiResponse } from "@utils/apiResponse";
import { getDateRange } from "@utils/date";
import { CACHE_TTL, cacheUtils } from "@utils/redisCache";

// Type guard for validating period parameter
const isValidPeriod = (period: any): period is 'thisMonth' | 'lastMonth' | 'lastWeek' => {
	return ['thisMonth', 'lastMonth', 'lastWeek'].includes(period);
}

export const statisticsController = {
	getStatsSummary: async (req: Request, res: Response) => {
		try {
			const userId = (req as AuthenticatedRequest).userId;
			const periodQuery = req.query.period as string;

			if (!periodQuery || !isValidPeriod(periodQuery)) {
				return ApiResponse.error(res, "Invalid or missing 'period' query parameter. Use 'thisMonth', 'lastMonth', or 'lastWeek'.", 400);
			}

			const cacheKey = `statistics:${userId}:${periodQuery}`;
			const cachedStats = await cacheUtils.get(cacheKey);
			if (cachedStats) {
				ApiResponse.success(res, cachedStats, `${periodQuery} statistics retrieved successfully`);
				return;
			}

			// Get the date range for the requested period
			const { startDate, endDate } = getDateRange(periodQuery);

			const stats = await getStatsForPeriod(userId, startDate, endDate);

			try {
				await cacheUtils.set(`statistics:${userId}:${periodQuery}`, stats, CACHE_TTL.STATS);
			} catch (cacheError) {
				console.error('Cache set error:', cacheError);
			}

			ApiResponse.success(res, { period: periodQuery, stats }, `${periodQuery} statistics retrieved successfully`);
		} catch (error) {
			ApiResponse.error(res, 'Failed to retrieve statistics');
		}
	}
};
