import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

let cachedWeatherData: WeatherData | null = null;
let lastUpdateTime: number = 0;

export const getWeatherData = async (): Promise<WeatherData> => {
  const currentTime = Date.now();
  
  // 1시간(3600000ms)이 지나지 않았다면 캐시된 데이터 반환
  if (cachedWeatherData && (currentTime - lastUpdateTime) < 3600000) {
    return cachedWeatherData;
  }

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: 'Seoul', // 서울 기준
        appid: WEATHER_API_KEY,
        units: 'metric' // 섭씨 온도 사용
      }
    });

    const data = response.data;
    cachedWeatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description
    };
    
    lastUpdateTime = currentTime;
    return cachedWeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}; 