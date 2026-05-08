import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { courseService } from './course.service';
import sendResponse from '../../../utils/sendResponse';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.createCourse(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getCourses();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses Retrieved Successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await courseService.getSingleCourse(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Results get successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await courseService.updateCourse(id, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course Update Successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await courseService.deleteCourse(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course delete Successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
