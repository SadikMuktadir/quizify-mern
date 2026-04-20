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

const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultService.getAllResult();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Results get successfully',
    data: result,
  });
});
const getSingleResults = catchAsync(async (req: Request, res: Response) => {
  const resultId = req.params.resultId as string;
  const result = await ResultService.getSingleResult(resultId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Results get successfully',
    data: result,
  });
});

export const ResultController = {
  saveResult,
  getAllResults,
  getSingleResults,
};
