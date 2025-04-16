import prisma from "@config/db";

export const findAll = async () => {
	return await prisma.exercise.findMany(
		{
			orderBy: {
				name: 'asc'
			}
		}
	);
};
