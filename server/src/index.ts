import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { getWeather } from './controllers/weatherController';
import { collectDailyData } from './services/dataCollectionService';
import { weatherRouter } from './routes/weather';
import { dataCollectionService } from './services/dataCollectionService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wavepark';

// MongoDB 연결 이벤트 리스너 설정
mongoose.connection.on('connected', () => {
  console.log('MongoDB에 성공적으로 연결되었습니다.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 오류:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 연결이 끊어졌습니다.');
});

// MongoDB 연결 시도
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 시도 중...');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error);
    console.log('MongoDB가 실행 중인지 확인해주세요.');
    console.log('Windows의 경우:');
    console.log('1. 서비스 관리자에서 MongoDB 서비스를 시작하거나');
    console.log('2. 명령 프롬프트에서 mongod 명령어를 실행하세요');
  });

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

// 라우트 설정
app.use('/api/weather', weatherRouter);

// Start server
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  
  // 데이터 수집 서비스 시작
  dataCollectionService.start();
});
