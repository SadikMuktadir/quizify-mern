/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

import bcrypt from 'bcryptjs';
import { fileUploader } from '../../../utils/image/fileUploader';
import { TOptions } from '../../../utils/pagination';
import { UserPrev } from './user.model';

const createUser = async (req: Request) => {
  if (req.file) {
    const uploadFile = await fileUploader.uploadToCloudinary(req.file);
    req.body.profilePhoto = uploadFile?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const result = await UserPrev.create({
    email: req.body.email,
    password: hashedPassword,
    profilePhoto: req.body.profilePhoto || undefined,
  });

  return result;
};
const createModerator = async (req: Request) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const result = await UserPrev.create({
    email: req.body.email,
    password: hashedPassword,
    role: 'MODERATOR',
  });

  return result;
}

const createAdmin = async (req: Request) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const result = await UserPrev.create({
    email: req.body.email,
    password: hashedPassword,
    role: 'ADMIN',
  });

  return result;
};

const getAllUser = async (params: any, options: TOptions) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;

  const skip = (Number(page) - 1) * Number(limit);

  const { searchTerm, ...filterData } = params;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push(filterData);
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await UserPrev.find(whereCondition)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await UserPrev.countDocuments(whereCondition);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};
export const UserService = {
  createUser,
  createModerator,
  createAdmin,
  getAllUser,
};
