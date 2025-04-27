import axios from 'axios';
import { DailyData } from '../models/DailyData';
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

export const collectDailyData = async () => {
  try {
    // 시흥시의 날씨 데이터 가져오기
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        lat: 37.4395,  // 시흥시 위도
        lon: 126.7319, // 시흥시 경도
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr'     // 한국어로 날씨 설명 받기
      }
    });

    const weatherData = weatherResponse.data;
    
    // 수온 데이터는 임시로 기온에서 2도 낮게 설정 (실제로는 API에서 가져와야 함)
    const waterTemperature = weatherData.main.temp - 2;

    // 슈트 추천 로직 (실제 조건에 맞게 수정 필요)
    const suitRecommendations = [
      { suitType: "보드숏", condition: "불허" },
      { suitType: "스프링", condition: "불허" },
      { suitType: "3/2", condition: waterTemperature >= 15 ? "출격" : "조건부허용" },
      { suitType: "3/2 기모", condition: waterTemperature >= 12 ? "출격" : "조건부허용" },
      { suitType: "4/3", condition: waterTemperature >= 10 ? "출격" : "조건부허용" },
      { suitType: "4/3 기모", condition: "출격" },
      { suitType: "5mm", condition: "출격" }
    ];

    // bestSuit 결정 (실제 로직에 맞게 수정 필요)
    const bestSuit = suitRecommendations.find(suit => suit.condition === "출격")?.suitType || "4/3 기모";

    // 데이터 저장
    const dailyData = new DailyData({
      airTemperature: weatherData.main.temp,
      waterTemperature: waterTemperature,
      weather: weatherData.weather[0].description,
      suitRecommendations: suitRecommendations,
      bestSuit: bestSuit
    });

    await dailyData.save();
    console.log('Daily data collected and saved successfully');

  } catch (error) {
    console.error('Error collecting daily data:', error);
  }
}; 