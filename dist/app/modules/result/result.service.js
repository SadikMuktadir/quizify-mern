"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultService = void 0;
const result_model_1 = require("./result.model");
const mongoose_1 = __importDefault(require("mongoose"));
const saveResult = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, total, correct, wrong, skipped, score, category, topicName, questionIds, } = req.body;
    const result = yield result_model_1.Result.create({
        userId,
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
});
const getAllResult = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield result_model_1.Result.aggregate([
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
});
const getSingleResult = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield result_model_1.Result.find({
        userId: new mongoose_1.default.Types.ObjectId(userId),
    });
    return result;
});
exports.ResultService = {
    saveResult,
    getAllResult,
    getSingleResult,
};
