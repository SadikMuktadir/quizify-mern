"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.authService = void 0;
const jwtHelper_1 = require("../../../utils/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: payload.email,
        status: 'ACTIVE'
    }).exec();
    if (!user) {
        throw new Error('User not found or inactive');
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Password is wrong');
    }
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ email: user.email, role: user.role }, config_1.default.jwt_access_token, '1h');
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ email: user.email, role: user.role }, config_1.default.jwt_refresh_token, '90d');
    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt_refresh_token);
    }
    catch (err) {
        throw new Error('You are not authorized!');
    }
    const userData = yield user_model_1.User.findOne({
        email: decodedData.email,
        status: 'ACTIVE'
    }).exec();
    if (!userData) {
        throw new Error('User not found or inactive');
    }
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt_access_token, '1h');
    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange,
    };
});
exports.authService = {
    loginUser,
    refreshToken
};
