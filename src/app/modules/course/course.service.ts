import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse): Promise<ICourse> => {
  const result = await Course.create(payload);
  return result;
};

const getCourses = async (): Promise<ICourse[]> => {
  const result = await Course.find();
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourse = async (id: string, data: ICourse) => {
  const result = await Course.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const courseService = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
