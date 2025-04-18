import prisma from "@config/db";
import { RegisterRequest } from "@/types/auth";

export const createOne = async (data: RegisterRequest) => {
	return await prisma.user.create({ data });
};

export const findOne = async (where: { id?: string, email?: string }) => {
	return await prisma.user.findUnique({ where: where.id ? { id: where.id } : { email: where.email } });
};
