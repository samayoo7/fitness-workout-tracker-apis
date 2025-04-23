import { body } from "express-validator";

export const validateWorkoutLog = [
	body("workoutPlanId")
		.notEmpty().withMessage("Workout plan ID is required")
		.isString().withMessage("Workout plan ID must be a string"),
	
	body("workoutScheduleId")
		.notEmpty().withMessage("Workout schedule ID is required")
		.isString().withMessage("Workout schedule ID must be a string"),

	body("startTime")
		.notEmpty().withMessage("Start time is required")
		.isISO8601().toDate().withMessage("Start time must be a valid ISO 8601 date"),

	body("endTime")
		.notEmpty().withMessage("End time is required")
		.isISO8601().toDate().withMessage("End time must be a valid ISO 8601 date"),
	
	body("exercises")
		.notEmpty().withMessage("Exercises are required")
		.isArray().withMessage("Exercises must be an array"),

	body("exercises.*.exerciseId")
		.notEmpty().withMessage("Exercise ID is required")
		.isString().withMessage("Exercise ID must be a string"),

	body("exercises.*.setsCompleted")
		.notEmpty().withMessage("Sets completed is required")
		.isInt({ min: 1 }).withMessage("Sets completed must be a positive integer"),

	body("exercises.*.repsCompleted")
		.notEmpty().withMessage("Reps completed is required")
		.isInt({ min: 1 }).withMessage("Reps completed must be a positive integer"),

	body("exercises.*.weightUsed")
		.notEmpty().withMessage("Weight used is required")
		.isFloat({ min: 0 }).withMessage("Weight used must be a positive number"),

	body("exercises.*.notes")
		.optional()
		.isString().withMessage("Notes must be a string")
		.isLength({ max: 255 }).withMessage("Notes must be at most 255 characters long"),

	body("notes")
		.optional()
		.isString().withMessage("Notes must be a string")
		.isLength({ max: 255 }).withMessage("Notes must be at most 255 characters long"),

	body("rating")
		.optional()
		.isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5"),
];