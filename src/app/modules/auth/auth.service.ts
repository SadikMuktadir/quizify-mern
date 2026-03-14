/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { jwtHelper } from '../../../utils/jwtHelper';
import config from '../../config';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({
    email: payload.email,
    status: 'ACTIVE',
  }).exec();

  if (!user) {
    throw new Error('User not found or inactive');
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new Error('Password is wrong');
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt_access_token as string,
    '1h',
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt_refresh_token as string,
    '90d',
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt_refresh_token as string,
    );
  } catch (err) {
    throw new Error('You are not authorized!');
  }

  const userData = await User.findOne({
    email: decodedData.email,
    status: 'ACTIVE',
  }).exec();

  if (!userData) {
    throw new Error('User not found or inactive');
  }

  const accessToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt_access_token as string,
    '1h',
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
