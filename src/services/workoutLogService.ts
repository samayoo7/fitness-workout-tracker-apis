import prisma from "@config/db";
import { WorkoutLog } from "@/types/workoutLog";

export const createWorkoutLog = async (data: WorkoutLog) => {
	return await prisma.workoutLog.create({
		data: {
			workoutPlanId: data.workoutPlanId,
			workoutScheduleId: data.workoutScheduleId,
			startTime: data.startTime,
			endTime: data.endTime,
			exercises: {
				create: data.exercises
			},
			notes: data.notes,
			rating: data.rating,
			userId: data.userId
		}
	});
};

export const findWorkoutLogByScheduleId = async (scheduleId: string) => {
	return prisma.workoutLog.findUnique({
		where: {
			workoutScheduleId: scheduleId
		}
	});
};

export const findOverlappingWorkoutLogs = async ({
	userId,
	startTime,
	endTime,
	excludeScheduleId
}: {
	userId: string;
	startTime: Date;
	endTime: Date;
	excludeScheduleId?: string;
}) => {
	return prisma.workoutLog.findFirst({
		where: {
			userId,
			AND: [
				{
					startTime: {
						lte: endTime
					},
					endTime: {
						gte: startTime
					}
				},
				{
					workoutScheduleId: {
						not: excludeScheduleId
					}
				}
			]
		},
		include: {
			exercises: true
		}
	});
};

export const findAllWorkoutLogs = async (userId: string) => {
	return prisma.workoutLog.findMany({
		where: {
			userId
		}
	});
};

export const findWorkoutLogById = async (id: string) => {
	return prisma.workoutLog.findUnique({
		where: { id },
		include: {
			exercises: true,
			workoutSchedule: true,
			workoutPlan: true
		}
	});
};
