import { Request } from 'express';
import { Result } from './result.model';

const saveResult = async (req: Request) => {
  const {
    total,
    correct,
    wrong,
    skipped,
    score,
    category,
    topicName,
    questionIds,
  } = req.body;

  const result = await Result.create({
    userId: req.user._id,
    total,
    correct,
    wrong,
    skipped,
    score,
    category,
    topicName,
    questionIds,
  });

  return result;
};

const getMyResults = async (req: Request) => {
  return await Result.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
};

export const ResultService = {
  saveResult,
  getMyResults,
};
