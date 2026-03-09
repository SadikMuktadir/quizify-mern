import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../../utils/image/fileUploader';
import { userValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.get('/', auth("ADMIN"), UserController.getAllUser);

router.post(
  '/create-user',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createUserValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createUser(req, res, next);
  },
);

router.post(
  '/create-moderator',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.parse(req.body.data));
    req.body = userValidation.createModeratorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createModerator(req, res, next);
  },
);

router.post(
  '/create-admin',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createAdmin(req, res, next);
  },
);

export const userRoutes = router;
