import mongoose, { Schema } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    small_description: {
      type: String,
      required: true,
    },
    large_description: {
      type: String,
      required: true,
    },
    students: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
      default: [],
    },

    curriculum: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
export const Course = mongoose.model<ICourse>('Course', courseSchema);
