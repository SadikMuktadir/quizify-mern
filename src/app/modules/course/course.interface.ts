export interface ICourse {
  title: string;
  small_description: string;
  large_description: string;

  students: string;
  duration: string;
  rating: number;
  image: string;

  features: string[];
  curriculum: string[];

  // NEW FIELDS
  what_you_will_learn: string[];
  course_highlights: string[];
  target_students: string[];
  requirements: string[];
  exam_features: string[];

  total_mock_tests: number;
  total_mcq: number;

  price?: number;
  discount_price?: number;
  badge?: string;
}