import prisma from "@config/db";
import { CreateWorkoutPlan, UpdateWorkoutPlan } from "@/types/workout";
import { opensearchClient, WORKOUT_PLAN_INDEX } from "@/config/openSearch";

export const createOne = async (userId: string, data: CreateWorkoutPlan) => {
	const workoutPlan = await prisma.workoutPlan.create({ 
		data: {
			name: data.name,
			description: data.description,
			userId,
			items: {
				create: data.items
			}
		},
		include: {
			items: true
		}
	});

	await opensearchClient.index({
		index: WORKOUT_PLAN_INDEX,
		id: workoutPlan.id,
		body: {
			name: workoutPlan.name,
			description: workoutPlan.description,
			userId: workoutPlan.userId,
			isActive: workoutPlan.isActive,
			createdAt: workoutPlan.createdAt,
			exercises: workoutPlan.items.map((item: any) => ({
				exerciseId: item.exerciseId,
				sets: item.sets,
				repetitions: item.repetitions,
				weight: item.weight,
				restTime: item.restTime,
				notes: item.notes,
				exercise: {
					name: item.exercise.name,
					category: item.exercise.category,
					muscleGroup: item.exercise.muscleGroup,
					difficulty: item.exercise.difficulty
				}
			}))

		}
	});

	return workoutPlan;
};

export const findFirstByName = async (userId: string, name: string) => {
	return await prisma.workoutPlan.findFirst({
		where: {
			name,
			userId
		}
	});
};

export const findFirstById = async (userId: string, id: string) => {
	return await prisma.workoutPlan.findFirst({
		where: {
			id,
			userId
		},
		include: {
			items: true
		}
	});
};

export const updateOne = async (id: string, data: Partial<UpdateWorkoutPlan>) => {
	return await prisma.workoutPlan.update({
		where: { id },
		data: {
			...(data.name && { name: data.name }),
			...(data.description && { description: data.description }),
			...(typeof data.isActive === 'boolean' && { isActive: data.isActive }),
			...(data.items && {
				items: {
					deleteMany: {},
					create: data.items
				}
			})
		},
		include: {
			items: true
		}
	});
};

export const deleteOne = async (id: string) => {
	return await prisma.workoutPlan.delete({
		where: { id }
	});
};

export const findAll = async (userId: string) => {
	return await prisma.workoutPlan.findMany({
		where: { userId, isActive: true },
		include: {
			items: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
};
