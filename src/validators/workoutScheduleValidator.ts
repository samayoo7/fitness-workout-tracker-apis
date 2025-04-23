import { body } from "express-validator";

export const validateWorkoutSchedule = [
	body("workoutPlanId")
		.notEmpty().withMessage("Workout plan ID is required")
		.isString().withMessage("Workout plan ID must be a string"),

	body("scheduledDate")
		.notEmpty().withMessage("Scheduled date is required")
		.isISO8601().toDate().withMessage("Scheduled date must be a valid ISO 8601 date"),

	body("duration")
		.notEmpty().withMessage("Duration is required")
		.isInt({ min: 1 }).withMessage("Duration must be a positive integer"),

	body("notes")
		.optional()
		.isString().withMessage("Notes must be a string")
		.isLength({ max: 255 }).withMessage("Notes must be at most 255 characters long"),
];