import { Request, Response } from 'express';
import { authService } from './auth.service';

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.registerUser(payload);

  res.cookie('accessToken', result.token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
     maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.status(201).send({
    success: true,
    message: 'User created successfully',
    data: result?.user,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const getUser = req.body;
  const result = await authService.loginUser(getUser);

res.cookie('accessToken', result.token, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30,
});

res.status(200).json({
  success: true,
  message: 'Login successful',
  data: result.user,
});
};
const getAllUser = async (req: Request, res: Response) => {
  const result = await authService.getAllUser();
  res.status(201).send({
    success: true,
    message: 'User login successfully',
    data: result,
  });
};

export const authController = {
  registerUser,
  loginUser,
  getAllUser,
};
