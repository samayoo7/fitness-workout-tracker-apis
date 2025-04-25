import { createClient } from "redis";

const redisClient = createClient({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));

export const connectRedis = async () => {
	try {
		await redisClient.connect();
	} catch (error) {
		console.error("Error connecting to Redis:", error);
	}
};

export default redisClient;