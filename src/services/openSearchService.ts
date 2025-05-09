import { opensearchClient, EXERCISE_INDEX, WORKOUT_PLAN_INDEX } from "@config/openSearch";

const customAnalyzer = {
	analysis: {
		analyzer: {
			custom_analyzer: {
				type: 'custom' as const,
				tokenizer: 'standard',
				filter: ['lowercase', 'asciifolding']
			}
		}
	}
}

export class OpenSearchService {
	async initializeIndices() {
		await this.createExerciseIndex();
		await this.createWorkoutPlanIndex();
	};

	private async createExerciseIndex() {
		console.log('Creating exercise index...');
		const { body: exists } = await opensearchClient.indices.exists({ index: EXERCISE_INDEX });

		console.log("🚀 ~ OpenSearchService ~ createExerciseIndex ~ exists:", exists)
		if (!exists) {
			try {
				await opensearchClient.indices.create({
					index: EXERCISE_INDEX,
					body: {
						mappings: {
							properties: {
								name: { type: 'text', analyzer: 'custom_analyzer' },
								description: { type: 'text', analyzer: 'custom_analyzer' },
								category: { type: 'keyword' },
								muscleGroup: { type: 'keyword'},
								difficulty: { type: 'keyword'},
								createdAt: { type: 'date' },
							},
						},
						settings: customAnalyzer
					},
				});
				console.log(`Created ${EXERCISE_INDEX} index`);
			} catch (error) {
				console.error(`Error creating ${EXERCISE_INDEX} index:`, error);
			}
		} else {
			console.log(`${EXERCISE_INDEX} index already exists`);
		}
	}

	private async createWorkoutPlanIndex() {
		const { body: exists } = await opensearchClient.indices.exists({ index: WORKOUT_PLAN_INDEX });

		if (!exists) {
			try {
				await opensearchClient.indices.create({
					index: WORKOUT_PLAN_INDEX,
					body: {
						mappings: {
							properties: {
								name: { type: 'text', analyzer: 'custom_analyzer' },
								description: { type: 'text', analyzer: 'custom_analyzer' },
								userId: { type: 'keyword' },
								isActive: { type: 'boolean' },
								createdAt: { type: 'date' },
								exercises: {
									type: 'nested',
									properties: {
										exerciseId: { type: 'keyword' },
										sets: { type: 'integer' },
										repetitions: { type: 'integer' },
										weight: { type: 'float' },
										restTime: { type: 'integer' },
										notes: { type: 'text', analyzer: 'custom_analyzer' },
										exercise: {
											type: 'object',
											properties: {
												name: { type: 'text' },
												category: { type: 'keyword' },
												muscleGroup: { type: 'keyword'},
												difficulty: { type: 'keyword'},
											},
										}
									},
								},
							},
						},
						settings: customAnalyzer,
					},
				});
				console.log(`Created ${WORKOUT_PLAN_INDEX} index`);
			} catch (error) {
				console.error(`Error creating ${WORKOUT_PLAN_INDEX} index:`, error);
			}
		} else {
			console.log(`${WORKOUT_PLAN_INDEX} index already exists`);
		}
	}
};
