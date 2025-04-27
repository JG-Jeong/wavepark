import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { getWeather } from './controllers/weatherController';
import { collectDailyData } from './services/dataCollectionService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wavepark';

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the TypeScript server!" });
});

// 날씨 API 엔드포인트
app.get('/api/weather', getWeather);

// 매일 오전 9시에 데이터 수집
cron.schedule('0 9 * * *', () => {
  console.log('Running daily data collection...');
  collectDailyData();
});

// 서버 시작 시 데이터 수집 실행
collectDailyData();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
