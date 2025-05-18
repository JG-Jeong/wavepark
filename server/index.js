const express = require('express');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weather');

const app = express();

// 메인터넌스 모드 미들웨어
app.use((req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.status(503).json({ message: '서비스 점검 중입니다.' });
  }
  next();
});

// MongoDB 연결
connectDB();

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use('/api/weather', weatherRoutes);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 