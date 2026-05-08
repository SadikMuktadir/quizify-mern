import { Router } from 'express';
import { courseController } from './course.controller';

const courseRouter = Router();

courseRouter.post('/create-course', courseController.createCourse);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:id', courseController.getSingleCourse);
courseRouter.patch('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);

export default courseRouter;
