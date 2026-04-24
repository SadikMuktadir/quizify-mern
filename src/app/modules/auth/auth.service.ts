import config from '../../config';
import { ILoginUser } from './auth.interface';
import { IUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './auth.model';

const registerUser = async (payload: IUser) => {
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
  });
  if (!user) {
    throw new Error('User not found');
  }
  const checkPassword = await bcrypt.compare(payload?.password, user?.password);

  if (!checkPassword) {
    throw new Error('Password is not match');
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

export const authService = {
  registerUser,
  loginUser,
};
