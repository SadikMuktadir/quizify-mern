"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultRoutes = void 0;
const express_1 = __importDefault(require("express"));
const result_controller_1 = require("./result.controller");
const router = express_1.default.Router();
router.post('/save-result', result_controller_1.ResultController.saveResult);
router.get('/', result_controller_1.ResultController.getAllResults);
router.get('/:resultId', result_controller_1.ResultController.getSingleResults);
exports.resultRoutes = router;
