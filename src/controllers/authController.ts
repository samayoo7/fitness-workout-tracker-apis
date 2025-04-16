import { Request, Response } from "express";
import { createOne, findOne } from "@/services/userService";
import { ApiResponse } from "@utils/apiResponse";
import { createHashedPassword, generateToken, comparePassword } from "@utils/authUtils";
import { sendMail } from "@utils/sendMail";

const authController = {
	register: async (req: Request, res: Response) => {
		try {
			const { email, name, password } = req.body;

			const existingUser = await findOne({ email });
			if (existingUser) {
				ApiResponse.badRequest(res, 'User already exists');
				return;
			}

			const hashedPassword = await createHashedPassword(password);

			const user = await createOne({ email, name, password: hashedPassword });

			await sendMail(email, name);

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

			ApiResponse.created(res, response, 'User created successfully');
		} catch (error) {
			console.error('Error creating user:', error);
			ApiResponse.error(res, 'Failed to create user');
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const user = await findOne({ email });
			if (!user) {
				ApiResponse.badRequest(res, 'User not found');
				return;
			}

			const isPasswordValid = await comparePassword(password, user.password);
			if (!isPasswordValid) {
				ApiResponse.badRequest(res, 'Invalid password');
				return;
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

			ApiResponse.success(res, response, 'User logged in successfully');
		} catch (error) {
			console.error('Error logging in:', error);
			ApiResponse.error(res, 'Failed to log in');
		}
	},
};

export default authController;