import redisClient from "@config/redis";

export const CACHE_TTL = {
	AUTH: 3600, // 1 hour
	WORKOUT: 1800, // 30 minutes
	WORKOUT_LOG: 3600, // 1 hour
	EXERCISE: 86400, // 24 hours
	STATS: 300 // 5 minutes
};

export const cacheUtils = {
	/**
	 * Get data from cache
	 */
	async get<T>(key: string): Promise<T | null> {
		const data = await redisClient.get(key);
		return data ? JSON.parse(data) : null;
	},

	/**
	 * Set data in cache
	 */
	async set<T>(key: string, data: T, ttl: number = 3600): Promise<void> {
		await redisClient.setEx(key, ttl, JSON.stringify(data));
	},

	/**
	 * Delete cache by key
	 */
	async del(key: string): Promise<void> {
		await redisClient.del(key);
	},

	/**
	 * Delete cache by pattern
	 */
	async delByPattern(pattern: string): Promise<void> {
		const keys = await redisClient.keys(pattern);
		if (keys.length > 0) {
			await redisClient.del(keys);
		}
	}
};
