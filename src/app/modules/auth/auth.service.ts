import bcrypt from 'bcrypt';
import User from './auth.model';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { ILoginUser, IUser } from './auth.interface';

const registerUser = async (payload: IUser) => {
  if (!payload.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const userData = { ...payload, password: hashedPassword };
  const result = await User.create(userData);
  const token = jwt.sign(
    {
      _id: result._id,
      email: result?.email,
      role: result?.role,
    },
    config.jwt_access_token || 'secret-token',
    { expiresIn: '30d' },
  );

  return { token, user: result };
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({
    email: payload?.email,
  }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  if (!config.jwt_access_token) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    {
      _id: user?._id,
      email: user?.email,
      role: user?.role,
    },
    config.jwt_access_token || 'secret-token',
    { expiresIn: '30d' },
  );

  return { token, user };
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

export const authService = {
  registerUser,
  loginUser,
  getAllUser,
};
