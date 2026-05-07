import { Router } from 'express';
import { courseController } from './course.controller';

const courseRouter = Router();

courseRouter.post('/create-course', courseController.createCourse);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:id', courseController.getSingleCourse);


export default courseRouter;
