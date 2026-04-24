import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { authService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  res.cookie('accessToken', result.token, {
    httpOnly: true,
    // secure: false, // 🔴 change to true in production (HTTPS)
    // sameSite: 'lax',
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(201).send({
    success: true,
    message: 'User created successfully',
    token: result.token, // ✅ add this
    data: result.user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.cookie('accessToken', result.token, {
    httpOnly: true,
    // secure: false, // 🔴 change to true in production (HTTPS)
    // sameSite: 'lax',secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(201).send({
    success: true,
    message: 'User login successfully',
    token: result?.token,
    data: result?.user,
  });
});
export const authController = {
  register,
  login,
};
