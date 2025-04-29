import express, { Request, Response } from 'express';
import { connectDB } from './config/database';
import weatherRouter from './routes/weather';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MongoDB 연결
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api/weather', weatherRouter);

// 기본 라우트
app.get('/', (_req: Request, res: Response) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
