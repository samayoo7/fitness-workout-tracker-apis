import prisma from "@/config/db";
import { WorkoutSchedule } from "@/types/workoutSchedule";

export const createWorkoutSchedule = async (data: WorkoutSchedule) => {
	return await prisma.workoutSchedule.create({
		data: {
			...data,
		}
	});
};
