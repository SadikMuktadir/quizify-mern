import express, { Request, Response } from 'express';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://quizifyfront.vercel.app'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Server is running',
  });
});

export default app;
