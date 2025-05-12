import prisma from "@config/db";
import { searchExercises } from "./elasticsearchService";

export const findAll = async (query: string) => {
	if (query) {
		return await searchExercises(query);
	}

	return await prisma.exercise.findMany(
		{
			orderBy: {
				name: 'asc'
			}
		}
	);
};
