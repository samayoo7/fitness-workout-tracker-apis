import prisma from "@config/db";
import { EXERCISE_INDEX, opensearchClient } from "@config/openSearch";

export const findAll = async (query: string) => {
	if (query) {
		const searchBody = {
			query: {
				bool: {
					must: [
						{
							multi_match: {
								query,
								fields: ['name^2', 'description'],
								fuzziness: 'AUTO'
							}
						}
					]
				}
			}
		};

		const { body } = await opensearchClient.search({
			index: EXERCISE_INDEX,
			body: searchBody
		});

		return body.hits.hits.map((hit: any) => ({
			...hit._source,
			score: hit._score
		}));
	}

	return await prisma.exercise.findMany(
		{
			orderBy: {
				name: 'asc'
			}
		}
	);
};
