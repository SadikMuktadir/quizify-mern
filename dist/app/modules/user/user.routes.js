"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploader_1 = require("../../../utils/image/fileUploader");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)("ADMIN"), user_controller_1.UserController.getAllUser);
router.post('/create-user', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.userValidation.createUserValidationSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createUser(req, res, next);
});
router.post('/create-moderator', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    console.log(JSON.parse(req.body.data));
    req.body = user_validation_1.userValidation.createModeratorValidationSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createModerator(req, res, next);
});
router.post('/create-admin', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.userValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createAdmin(req, res, next);
});
exports.userRoutes = router;
