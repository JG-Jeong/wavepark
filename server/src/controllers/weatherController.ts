import { Request, Response } from 'express';
import { getWeatherData } from '../services/weatherService';

export const getWeather = async (req: Request, res: Response) => {
  try {
    const weatherData = await getWeatherData();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}; 