/* eslint-disable @typescript-eslint/no-explicit-any */

import { Result } from './result.model';
import mongoose from 'mongoose';

const saveResult = async (req: any) => {
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

const getAllResult = async () => {
  const result = await Result.aggregate([
    {
      $group: {
        _id: '$userId',
        totalScore: { $sum: '$score' },
        attempts: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        userId: '$_id',
        name: '$user.name',
        score: '$totalScore',
        attempts: 1,
      },
    },
    {
      $sort: { score: -1 },
    },
  ]);

  return result;
};

const getSingleResult = async (userId: string) => {
  const result = await Result.find({
    userId: new mongoose.Types.ObjectId(userId),
  });

  return result;
};
export const ResultService = {
  saveResult,
  getAllResult,
  getSingleResult,
};
