import mongoose, { Schema } from 'mongoose';
import { IResult } from './result.interface';

const resultSchema = new Schema<IResult>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    total: { type: Number },
    correct: { type: Number },
    wrong: { type: Number },
    skipped: { type: Number },
    score: { type: Number },
  },
  {
    timestamps: true,
  },
);
export const Result = mongoose.model<IResult>('Result', resultSchema);
