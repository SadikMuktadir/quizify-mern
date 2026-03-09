import z from 'zod';

const createUserValidationSchema = z.object({
  email: z.string({
    error: 'Email is required',
  }),
  password: z.string({
    error: 'Password is required',
  }),
});

const createAdminValidationSchema = z.object({
  email: z.string({
    error: 'Email is required',
  }),
  password: z.string({
    error: 'Password is required',
  }),
});

const createModeratorValidationSchema = z.object({
  email: z.string({
    error: 'Email is required',
  }),
  password: z.string({
    error: 'Password is required',
  }),
});

export const userValidation = {
  createUserValidationSchema,
  createAdminValidationSchema,
  createModeratorValidationSchema,
};
