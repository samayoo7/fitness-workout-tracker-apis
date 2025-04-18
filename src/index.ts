import express from 'express';
import dotenv from 'dotenv';
import routes from '@routes/index';
import { initializeCronJobs } from '@/jobs';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Declare app
const app = express();

app.use(express.json());

// Declare routes
app.use('/api', routes);

// Initialize cron jobs
initializeCronJobs();

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});