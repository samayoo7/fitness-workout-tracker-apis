import { Router } from 'express';
import authController from '@controllers/authController';
import { validateUser, handleValidationErrors, validateLogin } from '@validators/userValidator';

const router = Router();

router.post('/register', validateUser, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

export default router;