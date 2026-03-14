import express, { Request, Response } from 'express';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: ['https://quizifyfront.vercel.app', 'http://localhost:3000'],
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
