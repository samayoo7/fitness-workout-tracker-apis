import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiResponse } from "@utils/apiResponse";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ApiResponse.badRequest(res, 'Validation error', errors.array().map(error => error.msg));
        return;
    }
    next();
}; 