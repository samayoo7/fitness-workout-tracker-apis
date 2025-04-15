import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '@/utils/authUtils';
import { ApiResponse } from '@/utils/apiResponse';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return ApiResponse.unauthorized(res, 'No token provided');
		}

		const decoded = verifyToken(token) as { userId: string };
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return ApiResponse.unauthorized(res, 'Invalid token');
	}
};
