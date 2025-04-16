import prisma from "@config/db";
import { sendMail } from "@utils/sendMail";

export const scheduleReminderJob = async () => {
	try {
		// Get all workout schedules for the next hour that haven't been completed
		const now = new Date();
		const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

		const upcomingSchedules = await prisma.workoutSchedule.findMany({
			where: {
				scheduledDate: {
					gte: now,
					lt: oneHourFromNow
				},
				isCompleted: false
			},
			include: {
				user: true,
				workoutPlan: true
			}
		});

		// Send reminder emails for each upcoming schedule
		for (const schedule of upcomingSchedules) {
			const { user, workoutPlan } = schedule;

			await sendMail(
				user.email,
				user.name,
				{
					subject: 'Workout Reminder',
					customMessage: `<h2>Upcoming Workout Reminder</h2>
						<p>Hi ${user.name},</p>
						<p>Don't forget your scheduled workout <strong>"${workoutPlan.name}"</strong> starting in the next hour!</p>
						<p>Get ready to crush your fitness goals! 💪</p>`
				}
			);
		}

		console.log(`Sent ${upcomingSchedules.length} workout reminders`);
	} catch (error) {
		console.error('Error in schedule reminder job:', error);
	}
};
