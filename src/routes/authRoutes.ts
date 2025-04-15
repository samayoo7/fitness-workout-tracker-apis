import { Router } from 'express';
import authController from '@controllers/authController';
import { validateUser, validateLogin } from '@validators/userValidator';
import { handleValidationErrors } from '@validators/common';

const router = Router();

router.post('/register', validateUser, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

export default router;