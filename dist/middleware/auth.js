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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config"));
const auth_model_1 = __importDefault(require("../app/modules/auth/auth.model"));
// Extend Express Request type (IMPORTANT)
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            // 1. Get token safely
            const authHeader = req.headers.authorization;
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
                (authHeader ? authHeader.split(' ')[1] : undefined);
            // 2. Validate token exists
            if (!token || typeof token !== 'string') {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: no token provided',
                });
            }
            // 3. Verify token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token);
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
            // 4. Find user
            const user = yield auth_model_1.default.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            // 5. Role check
            if (requiredRoles.length > 0 &&
                !requiredRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: insufficient permissions',
                });
            }
            // 6. Attach user to request
            req.user = user;
            next();
        }
        catch (error) {
            console.error('Auth error:', error);
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
            });
        }
    });
};
exports.default = auth;
