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

const getSingleResult = async (userId: string) => {
  const result = await Result.findOne({ userId });
  return result;
};

export const ResultService = {
  saveResult,
  getSingleResult,
};
