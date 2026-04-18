import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { ResultService } from './result.service';
import sendResponse from '../../../utils/sendResponse';

const saveResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultService.saveResult(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Result save Successfully',
    data: result,
  });
});

const getMyResults = catchAsync(async (req: Request, res: Response) => {
  const results = await ResultService.getMyResults(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Results fetched successfully',
    data: results,
  });
});

export const ResultController = {
  saveResult,
  getMyResults,
};
