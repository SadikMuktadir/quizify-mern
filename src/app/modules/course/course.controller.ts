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

export const courseController = {
  createCourse,
};
