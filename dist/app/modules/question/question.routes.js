"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("./question.controller");
const router = express_1.default.Router();
router.get('/', question_controller_1.QuestionController.getAllQuestions);
router.post('/create-question', (req, res, next) => {
    return question_controller_1.QuestionController.createQuestion(req, res, next);
});
router.post('/upload-question', (req, res, next) => {
    return question_controller_1.QuestionController.uploadQuestions(req, res, next);
});
router.delete('/delete-question/:id', (req, res, next) => {
    return question_controller_1.QuestionController.deleteQuestion(req, res, next);
});
router.delete('/delete-by-topic/:topicName', (req, res, next) => {
    return question_controller_1.QuestionController.deleteQuestionByTopic(req, res, next);
});
exports.questionRoutes = router;
