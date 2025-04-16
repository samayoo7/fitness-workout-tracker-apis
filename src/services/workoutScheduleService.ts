import prisma from "@/config/db";
import { WorkoutSchedule } from "@/types/workoutSchedule";

export const createWorkoutSchedule = async (data: WorkoutSchedule) => {
	return await prisma.workoutSchedule.create({
		data: {
			...data,
		},
		include: {
			workoutPlan: true,
		},
	});
};

export const findExistingWorkoutSchedule = async (userId: string, scheduledDate: Date) => {
	return await prisma.workoutSchedule.findFirst({
		where: {
			userId,
			scheduledDate
		},
	});
};
