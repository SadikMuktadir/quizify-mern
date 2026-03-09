/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export {};
