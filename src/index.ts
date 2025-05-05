import { setupAliases } from './setupAliases';
setupAliases();

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from '@routes/index';
import { initializeCronJobs } from '@/jobs';
import { specs } from '@config/swagger';
import { connectRedis } from '@config/redis';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Declare app
const app = express();
app.use(express.json());

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200
}

// app.use((req, res, next) => {
// 	console.log(`Request from origin: ${req.headers.origin}`);
// 	const origin = req.headers.origin;

// 	if (origin && !['http://example.com'].includes(origin)) {
// 		return ApiResponse.error(res, 'CORS error: Origin not allowed', 403)
// 	}
// 	next();
// });

app.use(cors(corsOptions));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Declare routes
app.use('/api', routes);

// Initialize cron jobs
initializeCronJobs();

// Health check route
app.get('/health', (_, res) => {
	res.status(200).json({
		status: 'OK',
		message: 'Server is running',
		timestamp: new Date().toISOString()
	});
});

// Connect to Redis
connectRedis();

// Start the server
app.listen(PORT, () => {
	console.log(`🚀 Server started on port ${PORT}`);
}).on('error', (err) => {
	console.error('❌ Server failed to start:', err);
});