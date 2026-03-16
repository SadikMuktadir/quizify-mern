import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { questionRoutes } from '../modules/question/question.routes';
import authRouter from '../modules/auth/auth.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/question',
    route: questionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
