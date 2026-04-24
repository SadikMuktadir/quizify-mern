import { Router } from 'express';
import { authController } from './auth.controller';

const authRouter = Router();

authRouter.post('/register-user', authController.register);

authRouter.post('/login-user', authController.login);

export default authRouter;
