import { body } from "express-validator";

export const validateUser = [
	body("name")
		.notEmpty().withMessage("Name is required")
		.isLength({ min: 2, max: 50 }).withMessage("Name must be at least 2 characters long"),
	
	body("email")
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Invalid email address")
		.normalizeEmail(),

	body("password")
		.notEmpty().withMessage("Password is required")
		.isLength({ min: 8, max: 50 }).withMessage("Password must be at least 8 characters long")
		.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
		.matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
		.matches(/[0-9]/).withMessage('Password must contain at least one number')
		.matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
];

export const validateLogin = [
	body("email")
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Invalid email address")
		.normalizeEmail(),

	body("password")
		.notEmpty().withMessage("Password is required")
];

