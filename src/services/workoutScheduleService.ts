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

export const updateWorkoutSchedule = async (id: string, data: WorkoutSchedule) => {
	return await prisma.workoutSchedule.update({
		where: { id },
		data,
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

export const findWorkoutScheduleById = async (id: string) => {
	return await prisma.workoutSchedule.findUnique({
		where: { id },
		include: {
			workoutPlan: true,
		},
	});
};

export const deleteWorkoutSchedule = async (id: string) => {
	return await prisma.workoutSchedule.delete({
		where: { id },
	});
};

export const findAllWorkoutSchedules = async (userId: string) => {
	return await prisma.workoutSchedule.findMany({
		where: { userId },
		orderBy: {
			scheduledDate: 'desc',
		},
		include: {
			workoutPlan: true,
		},
	});
};

export const markWorkoutScheduleAsCompleted = async (id: string) => {
	return await prisma.workoutSchedule.update({
		where: { id },
		data: { isCompleted: true },
	});
};
