export interface WorkoutSchedule {
	workoutPlanId: string;
	scheduledDate: Date;
	scheduledTime: Date;
	duration: number;
	notes?: string;
	userId: string;
}