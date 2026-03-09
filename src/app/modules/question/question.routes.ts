import express, { Request, Response, NextFunction } from 'express';
import { QuestionController } from './question.controller';

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);

router.post(
  '/create-question',
  (req: Request, res: Response, next: NextFunction) => {
    return QuestionController.createQuestion(req, res, next);
  },
);

router.post(
  '/upload-question',
  (req: Request, res: Response, next: NextFunction) => {
    return QuestionController.uploadQuestions(req, res, next);
  },
);

router.delete(
  '/delete-question/:id',
  (req: Request, res: Response, next: NextFunction) => {
    return QuestionController.deleteQuestion(req, res, next);
  },
);

router.delete(
  '/delete-by-topic/:topicName',
  (req: Request, res: Response, next: NextFunction) => {
    return QuestionController.deleteQuestionByTopic(req, res, next);
  },
);

export const questionRoutes = router;
