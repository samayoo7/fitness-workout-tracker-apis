import prisma from "@config/db";
import { searchExercises } from "./elasticsearchService";

export const findAll = async (query: string,  page: number = 1, limit: number = 10) => {
	if (query) {
		return await searchExercises(query, page, limit);
	}

	const [exercises, total] = await Promise.all([
		prisma.exercise.findMany({
			skip: (page - 1) * limit,
			take: limit,
			orderBy: {
				name: 'asc'
			}
		}),
		prisma.exercise.count()
	]);

	return {
		exercises: exercises,
		total,
		page,
		limit,
		pages: Math.ceil(total / limit),
	}
};
