import { Router } from 'express';
import { authController } from './auth.controller';
import auth from '../../../middleware/auth';

const authRouter = Router();

authRouter.post('/register-user', authController.registerUser);

authRouter.post('/login-user', authController.loginUser);
authRouter.get('/all-user', auth('ADMIN'), authController.getAllUser);

export default authRouter;
