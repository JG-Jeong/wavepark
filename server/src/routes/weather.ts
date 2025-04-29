import express from 'express';
import Weather from '../models/Weather';

const router = express.Router();

// 모든 날씨 데이터 조회
router.get('/', async (req, res) => {
  try {
    const weatherData = await Weather.find().sort({ date: -1 });
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 특정 날짜의 날씨 데이터 조회
router.get('/:date', async (req, res) => {
  try {
    const weatherData = await Weather.findOne({ date: new Date(req.params.date) });
    if (!weatherData) {
      return res.status(404).json({ message: '해당 날짜의 데이터가 없습니다.' });
    }
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 새로운 날씨 데이터 추가
router.post('/', async (req, res) => {
  try {
    const weatherData = new Weather(req.body);
    await weatherData.save();
    res.status(201).json(weatherData);
  } catch (error) {
    res.status(400).json({ message: '잘못된 데이터 형식입니다.' });
  }
});

export default router; 