import { Category, MuscleGroup, PrismaClient } from '@prisma/client';
import exercises from './data/exercises.json';

const prisma = new PrismaClient();

async function seed() {
	console.log('Starting to seed exercises...');

	try {
		// Clear existing data
		await prisma.exercise.deleteMany({});
		console.log('Cleared existing exercises');

		// Insert all exercises at once
		const result = await prisma.exercise.createMany({
			data: exercises.exercises.map(exercise => ({
				...exercise,
				category: exercise.category as Category,
				muscleGroup: exercise.muscleGroup as MuscleGroup
			})),
			skipDuplicates: true // Skip any duplicate records
		});
		console.log(`Processed ${result.count} exercises`);

		console.log(`Successfully seeded ${result.count} exercises`);
	} catch (error) {
		console.error('Error seeding exercises:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Execute the seed function if this file is run directly
if (require.main === module) {
	seed()
		.then(() => console.log('Seeding completed'))
		.catch((e) => console.error('Seeding failed:', e));
}

export { seed as seedExercises };