import { Router } from 'express';
import { courseController } from './course.controller';

const courseRouter = Router();

courseRouter.post('/create-course', courseController.createCourse);

export default courseRouter;
