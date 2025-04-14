import prisma from "@/config/db";
import { CreateWorkoutPlan } from "@/types/workout";

export const createOne = async (userId: string, data: Omit<CreateWorkoutPlan, 'userId'>) => {
	return await prisma.workoutPlan.create({ 
		data: {
			name: data.name,
			description: data.description,
			userId,
			items: {
				create: data.items
			}
		} 
	});
};

export const findFirst = async (name: string, userId: string) => {
	return await prisma.workoutPlan.findFirst({
		where: {
			name,
			userId
		}
	});
};
