import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse): Promise<ICourse> => {
  const result = Course.create(payload);
  return result;
};

export const courseService = {
  createCourse,
};
