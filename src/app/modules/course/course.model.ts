import mongoose, { Schema } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    small_description: {
      type: String,
      required: true,
      trim: true,
    },

    large_description: {
      type: String,
      required: true,
      trim: true,
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
      default: 5,
      min: 0,
      max: 5,
    },

    image: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    curriculum: {
      type: [String],
      default: [],
    },

    // NEW SECTION DATA

    what_you_will_learn: {
      type: [String],
      default: [],
    },

    course_highlights: {
      type: [String],
      default: [],
    },

    target_students: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    exam_features: {
      type: [String],
      default: [],
    },

    total_mock_tests: {
      type: Number,
      default: 0,
    },

    total_mcq: {
      type: Number,
      default: 0,
    },

    // Pricing (optional but recommended)

    price: {
      type: Number,
      default: 0,
    },

    discount_price: {
      type: Number,
      default: 0,
    },

    badge: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model<ICourse>(
  'Course',
  courseSchema
);