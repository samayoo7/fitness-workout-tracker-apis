import { Category, MuscleGroup, PrismaClient } from '@prisma/client';
import { EXERCISE_INDEX, opensearchClient } from '../../src/config/openSearch';

const prisma = new PrismaClient();

const exercises = [
	// Cardio Exercises
	{
		name: 'Running',
		description: 'Running at a moderate to high intensity on a treadmill or outdoors.',
		category: Category.CARDIO,
		muscleGroup: MuscleGroup.FULLBODY
	},
	{
		name: 'Cycling',
		description: 'Pedaling on a stationary bike or cycling outdoors to improve cardiovascular health.',
		category: Category.CARDIO,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Jumping Jacks',
		description: 'A calisthenic exercise that involves jumping to a position with legs spread wide and arms touching overhead.',
		category: Category.CARDIO,
		muscleGroup: MuscleGroup.FULLBODY
	},
	{
		name: 'Burpees',
		description: 'A full-body exercise involving a squat thrust and a jump.',
		category: Category.CARDIO,
		muscleGroup: MuscleGroup.FULLBODY
	},
	{
		name: 'Jump Rope',
		description: 'Skipping rope to improve coordination and cardiovascular fitness.',
		category: Category.CARDIO,
		muscleGroup: MuscleGroup.CALVES
	},

	// Strength Exercises - Upper Body
	{
		name: 'Push-ups',
		description: 'A bodyweight exercise that works the chest, shoulders, and triceps.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.CHEST
	},
	{
		name: 'Bench Press',
		description: 'A weight training exercise where a weight is pressed upward from a supine position.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.CHEST
	},
	{
		name: 'Pull-ups',
		description: 'An upper-body exercise where you hang from a bar and pull yourself up.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.BACK
	},
	{
		name: 'Lat Pulldown',
		description: 'A strength training exercise that targets the latissimus dorsi muscle.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.BACK
	},
	{
		name: 'Overhead Press',
		description: 'A shoulder strengthening exercise where weight is pressed overhead.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.SHOULDERS
	},
	{
		name: 'Lateral Raises',
		description: 'An isolation exercise that targets the lateral deltoid muscle.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.SHOULDERS
	},
	{
		name: 'Bicep Curls',
		description: 'An isolation exercise that targets the biceps brachii.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.BICEPS
	},
	{
		name: 'Tricep Dips',
		description: 'An exercise that targets the triceps by dipping the body between parallel bars or from a bench.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.TRICEPS
	},
	{
		name: 'Wrist Curls',
		description: 'An isolation exercise that targets the forearm muscles.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.FOREARMS
	},

	// Strength Exercises - Lower Body
	{
		name: 'Squats',
		description: 'A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Deadlifts',
		description: 'A compound exercise that works the lower back, glutes, and legs.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.BACK
	},
	{
		name: 'Lunges',
		description: 'A unilateral exercise that works the quadriceps, hamstrings, and glutes.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Leg Press',
		description: 'A machine-based exercise that primarily targets the quadriceps.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Hamstring Curls',
		description: 'An isolation exercise that targets the hamstring muscles.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.HAMSTRINGS
	},
	{
		name: 'Calf Raises',
		description: 'An isolation exercise that targets the gastrocnemius and soleus muscles.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.CALVES
	},

	// Core Exercises
	{
		name: 'Crunches',
		description: 'An abdominal exercise performed in a supine position.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.ABS
	},
	{
		name: 'Planks',
		description: 'An isometric core strength exercise that involves maintaining a position similar to a push-up.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.CORE
	},
	{
		name: 'Russian Twists',
		description: 'An exercise that targets the abdominal muscles, especially the obliques.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.ABS
	},
	{
		name: 'Mountain Climbers',
		description: 'A compound exercise that works multiple muscle groups including core, shoulders, and legs.',
		category: Category.STRENGTH,
		muscleGroup: MuscleGroup.CORE
	},

	// Flexibility Exercises
	{
		name: 'Hamstring Stretch',
		description: 'A stretch that targets the hamstring muscles.',
		category: Category.FLEXIBILITY,
		muscleGroup: MuscleGroup.HAMSTRINGS
	},
	{
		name: 'Quadriceps Stretch',
		description: 'A stretch that targets the quadriceps muscles.',
		category: Category.FLEXIBILITY,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Child\'s Pose',
		description: 'A resting yoga pose that stretches the back, hips, thighs, and ankles.',
		category: Category.FLEXIBILITY,
		muscleGroup: MuscleGroup.BACK
	},
	{
		name: 'Cobra Stretch',
		description: 'A yoga pose that stretches the chest and strengthens the spine.',
		category: Category.FLEXIBILITY,
		muscleGroup: MuscleGroup.CHEST
	},
	{
		name: 'Butterfly Stretch',
		description: 'A seated stretch that targets the inner thighs and groin.',
		category: Category.FLEXIBILITY,
		muscleGroup: MuscleGroup.HAMSTRINGS
	},

	// Balance Exercises
	{
		name: 'Single-Leg Stand',
		description: 'Standing on one leg to improve balance and stability.',
		category: Category.BALANCE,
		muscleGroup: MuscleGroup.CORE
	},
	{
		name: 'Bosu Ball Exercises',
		description: 'Various exercises performed on a Bosu ball to improve balance and stability.',
		category: Category.BALANCE,
		muscleGroup: MuscleGroup.CORE
	},

	// Plyometric Exercises
	{
		name: 'Box Jumps',
		description: 'Jumping onto a box or platform to improve explosive power.',
		category: Category.PLYOMETRIC,
		muscleGroup: MuscleGroup.QUADRICEPS
	},
	{
		name: 'Squat Jumps',
		description: 'A plyometric exercise that combines a squat with an explosive jump.',
		category: Category.PLYOMETRIC,
		muscleGroup: MuscleGroup.QUADRICEPS
	}
];

async function seed() {
	console.log('Starting to seed exercises...');

	try {
		// Clear existing data
		await prisma.exercise.deleteMany({});
		console.log('Cleared existing exercises');

		// Insert exercises
		for (const exercise of exercises) {
			const exe = await prisma.exercise.create({
				data: exercise
			});

			await opensearchClient.index({
				index: EXERCISE_INDEX,
				id: exe.id,
				body: {
					name: exe.name,
					description: exe.description,
					category: exe.category,
					muscleGroup: exe.muscleGroup,
					difficulty: exe.difficulty,
					createdAt: exe.createdAt
				},
				refresh: 'wait_for'
			});

			return exe;
		}

		console.log(`Successfully seeded ${exercises.length} exercises`);
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