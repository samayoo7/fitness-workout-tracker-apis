import { Exercise, WorkoutPlan } from '@prisma/client';
import client from '@config/elasticsearch';

// Exercise index configuration
const EXERCISE_INDEX = 'exercises';
const WORKOUT_PLAN_INDEX = 'workout_plans';

export const setupElasticsearchIndices = async () => {
	// Create Exercise index
	const exerciseIndexExists = await client.indices.exists({ index: EXERCISE_INDEX });

	if (!exerciseIndexExists) {
		await client.indices.create({
			index: EXERCISE_INDEX,
			mappings: {
				properties: {
					id: { type: 'keyword' },
					name: { type: 'text', analyzer: 'standard' },
					description: { type: 'text', analyzer: 'standard' },
					category: { type: 'keyword' },
					muscleGroup: { type: 'keyword' },
					difficulty: { type: 'keyword' }
				}
			}
		});
		console.log(`Index ${EXERCISE_INDEX} create successfully!`);
	}

	// Create WorkoutPlan index
	const workoutPlanIndexExists = await client.indices.exists({ index: WORKOUT_PLAN_INDEX });
	if (!workoutPlanIndexExists) {
		await client.indices.create({
			index: WORKOUT_PLAN_INDEX,
			mappings: {
				properties: {
					id: { type: 'keyword' },
					name: { type: 'text', analyzer: 'standard' },
					description: { type: 'text', analyzer: 'standard' },
					userId: { type: 'keyword' },
					isActive: { type: 'boolean' }
				}
			}
		});
		console.log(`Index ${WORKOUT_PLAN_INDEX} create successfully!`);
	}
};

// Exercise operations
export const indexExercise = async (exercise: Exercise) => {
	await client.index({
		index: EXERCISE_INDEX,
		id: exercise.id,
		document: exercise
	});
};

export const updateExerciseIndex = async (exercise: Exercise) => {
	await client.update({
		index: EXERCISE_INDEX,
		id: exercise.id,
		doc: exercise
	});
};

export const deleteExerciseIndex = async (exerciseId: string) => {
	await client.delete({
		index: EXERCISE_INDEX,
		id: exerciseId
	});
};

export const searchExercises = async (query: string, page: number = 1,
	limit: number = 10, filters?: {
		category?: string;
		muscleGroup?: string;
		difficulty?: string;
	}
) => {
	const should = [
		{ match_phrase: { name: { query, boost: 3, slop: 2 } } },
		{
			match: {
				name: {
					query,
					boost: 2,
					fuzziness: "AUTO",
					prefix_length: 1,
					// operator: "or"
				}
			}
		},
		{
			wildcard: {
				name: {
					value: `*${query.toLowerCase()}*`,
					boost: 1.5,
					case_insensitive: true
				}
			}
		},
		{
			match: {
				description: {
					query,
					fuzziness: "AUTO",
					boost: 1
				}
			}
		},
		// { match_phrase_prefix: { 
		// 	name: { 
		// 		query,
		// 		boost: 2,
		// 		max_expansions: 50
		// 	}
		// }}
	];

	const must: any[] = [];
	if (filters) {
		if (filters.category) must.push({ term: { category: filters.category } });
		if (filters.muscleGroup) must.push({ term: { muscleGroup: filters.muscleGroup } });
		if (filters.difficulty) must.push({ term: { difficulty: filters.difficulty } });
	}

	const from = (page - 1) * limit;

	const response = await client.search({
		index: EXERCISE_INDEX,
		from,
		size: limit,
		query: {
			bool: {
				should,
				must,
				minimum_should_match: 1
			}
		},
	});

	const total = response.hits.total as { value: number };

	return {
		exercises: response.hits.hits.map(hit => ({
			...(hit._source as Record<string, unknown>),
			score: hit._score
		})),
		total: total.value,
		page,
		limit,
		pages: Math.ceil(total.value / limit),
	}
};

// WorkoutPlan operations
export const indexWorkoutPlan = async (workoutPlan: WorkoutPlan) => {
	await client.index({
		index: WORKOUT_PLAN_INDEX,
		id: workoutPlan.id,
		document: workoutPlan
	});
};

export const updateWorkoutPlanIndex = async (workoutPlan: WorkoutPlan) => {
	await client.update({
		index: WORKOUT_PLAN_INDEX,
		id: workoutPlan.id,
		doc: workoutPlan
	});
};

export const deleteWorkoutPlanIndex = async (workoutPlanId: string) => {
	await client.delete({
		index: WORKOUT_PLAN_INDEX,
		id: workoutPlanId
	});
};

export const searchWorkoutPlans = async (query: string, userId?: string) => {
	const should = [
		{ match: { name: { query, boost: 2 } } },
		{ match: { description: query } }
	];

	const must: any[] = [];
	if (userId) must.push({ term: { userId } });

	const response = await client.search({
		index: WORKOUT_PLAN_INDEX,
		query: {
			bool: {
				should,
				must,
				minimum_should_match: 1
			}
		}
	});

	return response.hits.hits.map(hit => ({
		...(hit._source as Record<string, unknown>),
		score: hit._score
	}));
};
