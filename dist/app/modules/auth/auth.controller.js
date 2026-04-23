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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authService.registerUser(payload);
    res.cookie('accessToken', result.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(201).send({
        success: true,
        message: 'User created successfully',
        data: result === null || result === void 0 ? void 0 : result.user,
    });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = req.body;
    const result = yield auth_service_1.authService.loginUser(getUser);
    res.cookie('accessToken', result.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result.user,
    });
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.getAllUser();
    res.status(201).send({
        success: true,
        message: 'User login successfully',
        data: result,
    });
});
exports.authController = {
    registerUser,
    loginUser,
    getAllUser,
};
