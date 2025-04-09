import { PrismaClient } from '@prisma/client';
import { seedExercises } from './seeders/exerciseSeeder';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting database seeding...');

	try {
		// Run exercise seeder
		await seedExercises();

		// Add other seeders here as your application grows
		// await seedUsers();
		// await seedWorkouts();

		console.log('Database seeding completed successfully');
	} catch (error) {
		console.error('Error during database seeding:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();