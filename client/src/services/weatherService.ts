import axios from 'axios';
import type { AxiosError } from 'axios';


const API_URL = 'http://localhost:3001/api/weather';

export interface WeatherData {
  airTemperature: number;
  waterTemperature: number;
  weather: string;
  wetsuitThickness: number;
  date: string;
}

export class MaintenanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MaintenanceError';
  }
}

export const getLast7DaysWeather = async (): Promise<WeatherData[]> => {
  try {
    const response = await axios.get<WeatherData[]>(`${API_URL}/last7days`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 503) {
      throw new MaintenanceError('서비스 점검 중입니다. 잠시 후 다시 시도해주세요.');
    }
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getTodayWeather = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${API_URL}/today`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 503) {
      throw new MaintenanceError('서비스 점검 중입니다. 잠시 후 다시 시도해주세요.');
    }
    console.error('Error fetching today\'s weather:', error);
    throw error;
  }
}; 