"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: ['https://quizifyfront.vercel.app', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send({
        message: 'Server is running',
    });
});
exports.default = app;
