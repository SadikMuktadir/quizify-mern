import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { QuestionService } from './question.service';

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.createQuestion(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Question Created Successfully',
    data: result,
  });
});

const uploadQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.uploadQuestions(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Questions Uploaded Successfully',
    data: result,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.getAllQuestions(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Questions Retrieved Successfully....',
    data: result,
  });
});

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    throw new Error('Invalid question id');
  }

  const result = await QuestionService.deleteQuestion(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question Deleted Successfully',
    data: result,
  });
});

const deleteQuestionByTopic = catchAsync(
  async (req: Request, res: Response) => {
    const { topicName } = req.params;

    if (!topicName || Array.isArray(topicName)) {
      throw new Error('Invalid topic name');
    }

    const result = await QuestionService.deleteQuestionByTopic(topicName);

    if (result.deletedCount === 0) {
      throw new Error('No questions found with this topic name');
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Deleted ${result.deletedCount} questions successfully`,
      data: result,
    });
  },
);

export const QuestionController = {
  createQuestion,
  uploadQuestions,
  getAllQuestions,
  deleteQuestion,
  deleteQuestionByTopic,
};
