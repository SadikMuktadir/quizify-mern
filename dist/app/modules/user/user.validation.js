"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserValidationSchema = zod_1.default.object({
    email: zod_1.default.string({
        error: 'Email is required',
    }),
    password: zod_1.default.string({
        error: 'Password is required',
    }),
});
const createAdminValidationSchema = zod_1.default.object({
    email: zod_1.default.string({
        error: 'Email is required',
    }),
    password: zod_1.default.string({
        error: 'Password is required',
    }),
});
const createModeratorValidationSchema = zod_1.default.object({
    email: zod_1.default.string({
        error: 'Email is required',
    }),
    password: zod_1.default.string({
        error: 'Password is required',
    }),
});
exports.userValidation = {
    createUserValidationSchema,
    createAdminValidationSchema,
    createModeratorValidationSchema,
};
