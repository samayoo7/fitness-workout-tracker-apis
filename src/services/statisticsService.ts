import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Renamed interface
interface PeriodStats {
	workoutCount: number;
	totalDurationMinutes: number; // Duration in minutes
	totalExercises: number;
	totalVolume: number;
}

// Renamed function accepting startDate and endDate
export const getStatsForPeriod = async (userId: string, startDate: Date, endDate: Date): Promise<PeriodStats> => {

	// Ensure dates are valid Date objects
	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
		throw new Error("Invalid start or end date provided.");
	}

	const workoutLogs = await prisma.workoutLog.findMany({
		where: {
			userId: userId,
			startTime: {
				gte: startDate, // Use provided start date
				lt: endDate,   // Use provided end date
			},
			endTime: {
				not: null,
			},
		},
		include: {
			exercises: true,
		},
	});

	let totalDurationMilliseconds = 0;
	let totalExercises = 0;
	let totalVolume = 0;

	for (const log of workoutLogs) {
		if (log.endTime) {
			const startTime = new Date(log.startTime);
			const endTime = new Date(log.endTime);
			if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
				totalDurationMilliseconds += endTime.getTime() - startTime.getTime();
			}
		}
		totalExercises += log.exercises.length;
		for (const exercise of log.exercises) {
			totalVolume += (exercise.setsCompleted || 0) * (exercise.repsCompleted || 0) * (exercise.weightUsed || 0);
		}
	}

	const totalDurationMinutes = Math.round(totalDurationMilliseconds / (1000 * 60));

	return {
		workoutCount: workoutLogs.length,
		totalDurationMinutes,
		totalExercises,
		totalVolume,
	};
};

