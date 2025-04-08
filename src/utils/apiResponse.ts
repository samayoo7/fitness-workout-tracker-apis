export class ApiResponse {
	/**
	 * Success response
	 * @param res - The response object
	 * @param data - The data to send in the response
	 * @param message - The message to send in the response
	 * @param statusCode - The status code to send in the response
	 */
	static success<T>(
		res: any,
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
		res: any,
		message: string = 'Error',
		statusCode: number = 500,
		errors?: any
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
	static created<T>(res: any, data?: T, message: string = 'Resource created successfully') {
		return this.success(res, data, message, 201);
	}

	/**
	 * Bad Request - 400
	 */
	static badRequest<T>(res: any, message: string = 'Bad Request', errors?: any) {
		return this.error(res, message, 400, errors);
	}

	/**
	 * Unauthorized - 401
	 */
	static unauthorized(res: any, message: string = 'Unauthorized', errors?: any) {
		return this.error(res, message, 401, errors);
	}

	/**
	 * Forbidden - 403
	 */
	static forbidden(res: any, message: string = 'Forbidden', errors?: any) {
		return this.error(res, message, 403, errors);
	}

	/**
	 * Not Found - 404
	 */
	static notFound(res: any, message: string = 'Resource not found', errors?: any) {
		return this.error(res, message, 404, errors);
	}

	/**
	 * Internal Server Error - 500
	 */
	static internalServerError<T>(res: any, message: string = 'Internal Server Error', errors?: any) {
		return this.error(res, message, 500, errors);
	}
}
