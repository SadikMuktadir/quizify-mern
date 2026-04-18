import { ObjectId } from 'mongoose';

export interface IResult {
  userId: ObjectId;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
