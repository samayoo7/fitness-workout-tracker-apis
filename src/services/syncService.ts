import prisma from '@config/db';
import {
	indexExercise,
	updateExerciseIndex,
	deleteExerciseIndex,
	indexWorkoutPlan,
	updateWorkoutPlanIndex,
	deleteWorkoutPlanIndex,
	setupElasticsearchIndices
} from './elasticsearchService';
import { checkHealth, testConnection } from '@config/elasticsearch';

// Initialize Elasticsearch indices
export const initializeElasticsearch = async () => {
	try {
		await testConnection();
		await checkHealth();
		await setupElasticsearchIndices();

		// Sync existing data
		const exercises = await prisma.exercise.findMany();
		for (const exercise of exercises) {
			await indexExercise(exercise);
		}

		const workoutPlans = await prisma.workoutPlan.findMany();
		for (const workoutPlan of workoutPlans) {
			await indexWorkoutPlan(workoutPlan);
		}

		console.log('Elasticsearch indices initialized and data synced');
	} catch (error) {
		console.error('Error initializing Elasticsearch:', error);
	}
};

prisma.$extends({
	query: {
		exercise: {
			async create({ args, query }) {
				const result: any = await query(args);
				try {
					if (result && result.id) {
						await indexExercise({
							id: result.id!,
							name: result.name!,
							description: result.description!,
							category: result.category!,
							muscleGroup: result.muscleGroup,
							difficulty: result.difficulty!,
							createdAt: new Date(result.createdAt),
							updatedAt: new Date(result.updatedAt)
						});
					}
				} catch (error) {
					console.error('Error syncing Exercise with Elasticsearch:', error);
				}
				return result;
			},
			async update({ args, query }) {
				const result: any = await query(args);
				try {
					await updateExerciseIndex(result);
				} catch (error) {
					console.error('Error syncing Exercise with Elasticsearch:', error);
				}
				return result;
			},
			async delete({ args, query }) {
				const result = await query(args);
				try {
					await deleteExerciseIndex(args.where.id as string);
				} catch (error) {
					console.error('Error syncing Exercise with Elasticsearch:', error);
				}
				return result;
			}
		},
		workoutPlan: {
			async create({ args, query }) {
				const result: any = await query(args);
				try {
					await indexWorkoutPlan(result);
				} catch (error) {
					console.error('Error syncing WorkoutPlan with Elasticsearch:', error);
				}
				return result;
			},
			async update({ args, query }) {
				const result: any = await query(args);
				try {
					await updateWorkoutPlanIndex(result);
				} catch (error) {
					console.error('Error syncing WorkoutPlan with Elasticsearch:', error);
				}
				return result;
			},
			async delete({ args, query }) {
				const result: any = await query(args);
				try {
					await deleteWorkoutPlanIndex(args.where.id as string);
				} catch (error) {
					console.error('Error syncing WorkoutPlan with Elasticsearch:', error);
				}
				return result;
			}
		}
	}
});
