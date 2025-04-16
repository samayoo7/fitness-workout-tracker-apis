import { CronJob } from 'cron';
import { scheduleReminderJob } from './scheduleReminderJob';

export const initializeCronJobs = () => {
	new CronJob(
		'0 * * * *', // Runs at minute 0 of every hour
		scheduleReminderJob, // Function to execute
		null, // On complete callback
		true, // Start the job immediately
		'UTC' // Timezone
	);

	// Add more cron jobs here as needed

	console.log('Cron jobs initialized');
};
