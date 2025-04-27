import axios from 'axios';
import { Weather } from '../models/Weather';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const LAT = 37.4395; // 시흥시 위도
const LON = 126.7319; // 시흥시 경도

export const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    );

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      airTemp: response.data.main.temp,
      waterTemp: response.data.main.temp - 2, // 수온은 기온보다 2도 낮다고 가정
      weather: response.data.weather[0].main
    };

    // 데이터베이스에 저장
    const weather = new Weather(weatherData);
    await weather.save();

    return weatherData;
  } catch (error) {
    console.error('날씨 데이터 가져오기 실패:', error);
    throw error;
  }
}; 