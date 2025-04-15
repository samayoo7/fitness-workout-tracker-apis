import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export interface AuthenticatedRequest extends Request {
	userId: string;
}