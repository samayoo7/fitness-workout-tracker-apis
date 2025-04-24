import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Fitness Workout Tracker API',
			version: '1.0.0',
			description: 'API documentation for Fitness Workout Tracker application',
			contact: {
				name: 'API Support',
				email: 'semmangukiyaoo7@gmail.com'
			}
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development server'
			},
			{
				url: 'https://fitness-workout-tracker-apis.onrender.com',
				description: 'Production server'
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			}
		}
	},
	apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(options);