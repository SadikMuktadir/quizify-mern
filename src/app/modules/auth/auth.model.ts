import { model, Schema } from 'mongoose';
import { IUser } from './auth.interface';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER', 'MODERATOR'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', userSchema);
export default User;
