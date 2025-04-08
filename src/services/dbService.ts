import prisma from "@/config/db";
import { RegisterRequest } from "@/types/auth";

export const createOne = async (modal: 'user', data: RegisterRequest) => {
	return await prisma[modal].create({ data });
};

export const findOne = async (modal: 'user', where: { id?: string, email?: string }) => {
	return await prisma[modal].findUnique({ where: where.id ? { id: where.id } : { email: where.email } });
};
