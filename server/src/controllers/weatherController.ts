import { Request, Response } from 'express';
import { getWeatherData } from '../services/weatherService';
import { Weather } from '../models/Weather';

export const getWeather = async (req: Request, res: Response) => {
  try {
    // 가장 최근의 날씨 데이터를 가져옵니다
    const latestWeather = await Weather.findOne().sort({ createdAt: -1 });
    
    if (latestWeather) {
      res.json(latestWeather);
    } else {
      // 데이터가 없는 경우 새로운 데이터를 가져옵니다
      const weatherData = await getWeatherData();
      res.json(weatherData);
    }
  } catch (error) {
    console.error('날씨 데이터 가져오기 실패:', error);
    res.status(500).json({ error: '날씨 데이터를 가져오는데 실패했습니다.' });
  }
}; 