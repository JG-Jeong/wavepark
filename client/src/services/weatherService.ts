import axios from 'axios';

const API_URL = 'http://localhost:3001/api/weather';

export interface WeatherData {
  airTemperature: number;
  waterTemperature: number;
  weather: string;
  wetsuitThickness: number;
  date: string;
}

export const getLast7DaysWeather = async (): Promise<WeatherData[]> => {
  try {
    const response = await axios.get(`${API_URL}/last7days`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getTodayWeather = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}/today`);
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s weather:', error);
    throw error;
  }
}; 