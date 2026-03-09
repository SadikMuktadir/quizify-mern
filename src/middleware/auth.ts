
import { NextFunction, Request, Response } from 'express';
import { jwtHelper } from '../utils/jwtHelper';
import config from '../app/config';

const auth = (...roles: string[]) => {
  return async (
    req: Request ,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.cookies.accessToken

      if (!token) {
        throw new Error('You are not authorized');
      }
      const verifyUser = jwtHelper.verifyToken(
        token,
        config.jwt_access_token as string,
      );

      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error('You are not authorized');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
