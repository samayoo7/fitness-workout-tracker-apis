import { Response } from 'express';

export class ApiResponse {
	/**
	 * Success response
	 * @param res - The response object
	 * @param data - The data to send in the response
	 * @param message - The message to send in the response
	 * @param statusCode - The status code to send in the response
	 */
	static success<T>(
		res: Response,
		data?: T,
		message: string = 'Success',
		statusCode: number = 200
	) {
		return res.status(statusCode).json({
			success: true,
			message,
			data,
			statusCode
		});
	}

	/**
	 * Error response
	 */
	static error<T>(
		res: Response,
		message: string = 'Error',
		statusCode: number = 500,
		errors?: Record<string, unknown> | string[]
	) {
		return res.status(statusCode).json({
			success: false,
			message,
			errors,
			statusCode
		});
	}

	/**
	 * Created - 201
	 */
	static created<T>(res: Response, data?: T, message: string = 'Resource created successfully') {
		return this.success(res, data, message, 201);
	}

	/**
	 * Bad Request - 400
	 */
	static badRequest<T>(res: Response, message: string = 'Bad Request', errors?: Record<string, unknown> | string[]) {
		return this.error(res, message, 400, errors);
	}

	/**
	 * Unauthorized - 401
	 */
	static unauthorized(res: Response, message: string = 'Unauthorized', errors?: Record<string, unknown> | string[]) {
		return this.error(res, message, 401, errors);
	}

	/**
	 * Forbidden - 403
	 */
	static forbidden(res: Response, message: string = 'Forbidden', errors?: Record<string, unknown> | string[]) {
		return this.error(res, message, 403, errors);
	}

	/**
	 * Not Found - 404
	 */
	static notFound(res: Response, message: string = 'Resource not found', errors?: Record<string, unknown> | string[]) {
		return this.error(res, message, 404, errors);
	}

	/**
	 * Internal Server Error - 500
	 */
	static internalServerError<T>(res: Response, message: string = 'Internal Server Error', errors?: Record<string, unknown> | string[]) {
		return this.error(res, message, 500, errors);
	}
}
