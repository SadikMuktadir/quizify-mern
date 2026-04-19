"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const question_model_1 = require("./question.model");
const createQuestion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.create({
        category: req.body.category,
        topicName: req.body.topicName,
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer,
    });
    return result;
});
const uploadQuestions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = req.body;
    const result = yield question_model_1.Question.insertMany(questions, { ordered: false }); // skipDuplicates is not available in MongoDB
    return result;
});
const getAllQuestions = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.find()
        .sort({ createdAt: -1 });
    return result;
});
const deleteQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.findByIdAndDelete(id);
    return result;
});
const deleteQuestionByTopic = (topicName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.deleteMany({
        topicName: { $regex: `^${topicName}$`, $options: 'i' },
    });
    return result;
});
exports.QuestionService = {
    createQuestion,
    uploadQuestions,
    getAllQuestions,
    deleteQuestion,
    deleteQuestionByTopic,
};
