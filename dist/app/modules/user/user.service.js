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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fileUploader_1 = require("../../../utils/image/fileUploader");
const user_model_1 = require("./user.model");
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const uploadFile = yield fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.profilePhoto = uploadFile === null || uploadFile === void 0 ? void 0 : uploadFile.secure_url;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 8);
    const result = yield user_model_1.UserPrev.create({
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.body.profilePhoto || undefined,
    });
    return result;
});
const createModerator = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 8);
    const result = yield user_model_1.UserPrev.create({
        email: req.body.email,
        password: hashedPassword,
        role: 'MODERATOR',
    });
    return result;
});
const createAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 8);
    const result = yield user_model_1.UserPrev.create({
        email: req.body.email,
        password: hashedPassword,
        role: 'ADMIN',
    });
    return result;
});
const getAllUser = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const skip = (Number(page) - 1) * Number(limit);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: [
                { email: { $regex: searchTerm, $options: 'i' } },
            ],
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push(filterData);
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.UserPrev.find(whereCondition)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit));
    const total = yield user_model_1.UserPrev.countDocuments(whereCondition);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: result,
    };
});
exports.UserService = {
    createUser,
    createModerator,
    createAdmin,
    getAllUser,
};
