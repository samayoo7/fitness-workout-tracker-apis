import { body } from "express-validator";

export const validateWorkoutPlan = [
	body("name")
		.notEmpty().withMessage("Name is required")
		.isLength({ min: 2, max: 50 }).withMessage("Name must be at least 2 characters long"),

	body("description")
		.optional()
		.isLength({ max: 255 }).withMessage("Description must be at most 255 characters long"),

	body("items")
		.isArray().withMessage("Items must be an array")
		.notEmpty().withMessage("Items are required"),

	body("items.*.exerciseId")
		.isString().withMessage("Exercise ID must be a string")
		.notEmpty().withMessage("Exercise ID is required"),

	body("items.*.sets")
		.notEmpty().withMessage("Sets are required")
		.isInt({ min: 1 }).withMessage("Sets must be at least 1")
		.toInt(),

	body("items.*.repetitions")
		.notEmpty().withMessage("Repetitions are required")
		.isInt({ min: 1 }).withMessage("Repetitions must be at least 1")
		.toInt(),

	body("items.*.weight")
		.notEmpty().withMessage("Weight is required")
		.isFloat({ min: 0 }).withMessage("Weight must be at least 0")
		.toFloat(),

	body("items.*.restTime")
		.notEmpty().withMessage("Rest time is required")
		.isInt({ min: 0 }).withMessage("Rest time must be at least 0")
		.toInt(),

	body("items.*.order")
		.notEmpty().withMessage("Order is required")
		.isInt({ min: 1 }).withMessage("Order must be at least 1")
		.toInt(),

	body("items.*.notes")
		.optional()
		.isLength({ max: 255 }).withMessage("Notes must be at most 255 characters long"),
];
