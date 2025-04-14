import { Request } from 'express';

// declare module 'express' {
// 	export interface Request {
// 		userId?: string;
// 	}
// }

export interface AuthenticatedRequest extends Request {
	userId?: string;
}