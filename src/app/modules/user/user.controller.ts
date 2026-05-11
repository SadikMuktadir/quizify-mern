import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';
import pick from '../../../utils/pick';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Created Succesfully',
    data: result,
  });
});

const createModerator = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createModerator(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Moderator Created successfuly!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin Created successfuly!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['status', 'role', 'email', 'searchTerm']);

  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllUser(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrive Succesfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createUser,
  createModerator,
  createAdmin,
  getAllUser,
};
