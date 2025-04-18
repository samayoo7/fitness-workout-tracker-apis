export interface WorkoutLog {
	workoutPlanId: string;
	workoutScheduleId: string;
	startTime: Date;
	endTime?: Date;
	exercises: WorkoutLogExercise[];
	notes?: string;
	rating?: number;
	userId: string;
}

export interface WorkoutLogExercise {
	exerciseId: string;
	setsCompleted: number;
	repsCompleted: number;
	weightUsed: number;
	notes?: string;
}
