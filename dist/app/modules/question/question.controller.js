"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const question_service_1 = require("./question.service");
const createQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_service_1.QuestionService.createQuestion(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Question Created Successfully',
        data: result,
    });
}));
const uploadQuestions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_service_1.QuestionService.uploadQuestions(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Questions Uploaded Successfully',
        data: result,
    });
}));
const getAllQuestions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_service_1.QuestionService.getAllQuestions(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Questions Retrieved Successfully....',
        data: result,
    });
}));
const deleteQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new Error('Invalid question id');
    }
    const result = yield question_service_1.QuestionService.deleteQuestion(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Question Deleted Successfully',
        data: result,
    });
}));
const deleteQuestionByTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicName } = req.params;
    if (!topicName || Array.isArray(topicName)) {
        throw new Error('Invalid topic name');
    }
    const result = yield question_service_1.QuestionService.deleteQuestionByTopic(topicName);
    if (result.deletedCount === 0) {
        throw new Error('No questions found with this topic name');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Deleted ${result.deletedCount} questions successfully`,
        data: result,
    });
}));
exports.QuestionController = {
    createQuestion,
    uploadQuestions,
    getAllQuestions,
    deleteQuestion,
    deleteQuestionByTopic,
};
