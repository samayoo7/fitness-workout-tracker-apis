import prisma from "@config/db";
import { CreateWorkoutPlan, UpdateWorkoutPlan } from "@/types/workout";

export const createOne = async (userId: string, data: CreateWorkoutPlan) => {
	return await prisma.workoutPlan.create({ 
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
		}
	});
};
