import { Request, Response } from "express";
import { createOne, findOne } from "@services/dbService";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { ApiResponse } from "@/utils/apiResponse";
import { createHashedPassword, generateToken, comparePassword } from "@/utils/authUtils";

const authController = {
	register: async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
		try {
			const { email, name, password } = req.body;

			const existingUser = await findOne('user', { email });
			if (existingUser) {
				return ApiResponse.badRequest(res, 'User already exists');
			}

			const hashedPassword = await createHashedPassword(password);

			const user = await createOne('user', { email, name, password: hashedPassword });

			const token = generateToken(user.id);

			const response = {
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					createdAt: user.createdAt
				},
				token
			}

			return ApiResponse.created(res, response, 'User created successfully');
		} catch (error) {
			console.error('Error creating user:', error);
			return ApiResponse.error(res, 'Failed to create user');
		}
	},
	login: async (req: Request<{}, {}, LoginRequest>, res: Response) => {
		try {
			const { email, password } = req.body;

			const user = await findOne('user', { email });
			if (!user) {
				return ApiResponse.badRequest(res, 'User not found');
			}

			const isPasswordValid = await comparePassword(password, user.password);
			if (!isPasswordValid) {
				return ApiResponse.badRequest(res, 'Invalid password');
			}

			const token = generateToken(user.id);

			const response = {
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					createdAt: user.createdAt
				},
				token
			}

			return ApiResponse.success(res, response, 'User logged in successfully');
		} catch (error) {
			console.error('Error logging in:', error);
			return ApiResponse.error(res, 'Failed to log in');
		}
	},
};

export default authController;