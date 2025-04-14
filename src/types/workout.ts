export interface WorkoutPlanItem {
	exerciseId: string;
	sets: number;
	repetitions: number;
	weight: number;
	restTime: number;
	notes?: string;
	order: number;
}

export interface CreateWorkoutPlan {
	name: string;
	description?: string;
	items: WorkoutPlanItem[];
	userId: string;
}