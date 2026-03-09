/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from 'express';
import { Question } from './question.model';

const createQuestion = async (req: Request) => {
  const result = await Question.create({
    category: req.body.category,
    topicName: req.body.topicName,
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer,
  });

  return result;
};

const uploadQuestions = async (req: Request) => {
  const questions = req.body;
  const result = await Question.insertMany(questions, { ordered: false }); // skipDuplicates is not available in MongoDB

  return result;
};

const getAllQuestions = async (params: any) => {
  const result = await Question.find()
    .sort({ createdAt: -1 }); // descending

  return result;
};

const deleteQuestion = async (id: string) => {
  const result = await Question.findByIdAndDelete(id);
  return result;
};

const deleteQuestionByTopic = async (topicName: string) => {
  const result = await Question.deleteMany({
    topicName: { $regex: `^${topicName}$`, $options: 'i' },
  });

  return result;
};

export const QuestionService = {
  createQuestion,
  uploadQuestions,
  getAllQuestions,
  deleteQuestion,
  deleteQuestionByTopic,
};