export interface IUser {
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER' | 'MODERATOR';
}
export interface ILoginUser {
  email: string;
  password: string;
}
