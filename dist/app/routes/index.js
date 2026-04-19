"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const question_routes_1 = require("../modules/question/question.routes");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const result_router_1 = require("../modules/result/result.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/question',
        route: question_routes_1.questionRoutes,
    },
    {
        path: '/result',
        route: result_router_1.resultRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
