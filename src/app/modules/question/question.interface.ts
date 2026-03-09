import { Document } from 'mongoose';

export interface IQuestion extends Document {
  category: string;
  topicName: string;
  question: string;
  options: string[];
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}