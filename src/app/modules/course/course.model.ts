import mongoose, { Schema } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    students: {
      type: String,
    },
    duration: {
      type: String,
    },
    rating: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const Course = mongoose.model<ICourse>('Course', courseSchema);
