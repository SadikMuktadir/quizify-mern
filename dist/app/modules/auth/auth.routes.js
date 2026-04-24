"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/register-user', auth_controller_1.authController.register);
authRouter.post('/login-user', auth_controller_1.authController.login);
exports.default = authRouter;
