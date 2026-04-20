import { Types } from 'mongoose';

export interface IResult {
  userId: Types.ObjectId;
  category: string;
  topicName: string;
  questionIds?: Types.ObjectId[];
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
