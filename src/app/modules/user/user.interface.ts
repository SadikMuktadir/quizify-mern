import { Document } from 'mongoose';

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETE';

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  profilePhoto?: string;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}