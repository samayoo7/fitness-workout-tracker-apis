import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from '@routes/index';
import { initializeCronJobs } from '@/jobs';
import { specs } from '@config/swagger';

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

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});