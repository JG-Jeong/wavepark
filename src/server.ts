import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import { WeatherData } from './models/WeatherData';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 시흥시의 기상청 API 좌표 (격자)
const SIHEUNG_NX = 55;
const SIHEUNG_NY = 124;

// 기상청 API 키
const KMA_API_KEY = process.env.KMA_API_KEY;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 수온 데이터를 가져오는 함수 (임시로 고정값 사용)
const getWaterTemperature = () => {
  // 실제로는 수온 API를 호출하거나 다른 방법으로 수온을 가져와야 합니다
  return 15.3; // 임시 고정값
};

// 추천 슈트를 결정하는 함수
const getRecommendedSuit = (airTemp: number, waterTemp: number) => {
  if (airTemp < 10 || waterTemp < 15) {
    return "5/4기모";
  } else if (airTemp < 15 || waterTemp < 18) {
    return "4/3기모";
  } else if (airTemp < 20 || waterTemp < 22) {
    return "3/2";
  } else {
    return "2/2";
  }
};

// 현재 시간을 기상청 API 형식으로 변환
const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  
  return {
    baseDate: `${year}${month}${day}`,
    baseTime: `${hour}${minute}`,
    displayTime: `${hour}:${minute}`
  };
};

// 날씨 데이터를 가져오고 저장하는 함수
const fetchAndSaveWeatherData = async () => {
  try {
    const { baseDate, baseTime, displayTime } = getCurrentTime();

    // 초단기실황 조회
    const response = await axios.get(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
      {
        params: {
          serviceKey: KMA_API_KEY,
          pageNo: 1,
          numOfRows: 10,
          dataType: 'JSON',
          base_date: baseDate,
          base_time: baseTime,
          nx: SIHEUNG_NX,
          ny: SIHEUNG_NY
        }
      }
    );

    // 초단기예보 조회
    const forecastResponse = await axios.get(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`,
      {
        params: {
          serviceKey: KMA_API_KEY,
          pageNo: 1,
          numOfRows: 10,
          dataType: 'JSON',
          base_date: baseDate,
          base_time: baseTime,
          nx: SIHEUNG_NX,
          ny: SIHEUNG_NY
        }
      }
    );

    // 기온과 날씨 상태 추출
    const items = response.data.response.body.items.item;
    const forecastItems = forecastResponse.data.response.body.items.item;
    
    const temperature = items.find((item: any) => item.category === 'T1H')?.obsrValue;
    const weatherCondition = forecastItems.find((item: any) => item.category === 'SKY')?.fcstValue;
    
    // 날씨 상태 코드를 텍스트로 변환
    const getWeatherText = (code: string) => {
      switch(code) {
        case '1': return '맑음';
        case '3': return '구름많음';
        case '4': return '흐림';
        default: return '알 수 없음';
      }
    };

    const weatherData = new WeatherData({
      date: baseDate,
      time: displayTime,
      airTemperature: parseFloat(temperature),
      waterTemperature: getWaterTemperature(),
      recommendedSuit: getRecommendedSuit(parseFloat(temperature), getWaterTemperature()),
      weatherCondition: getWeatherText(weatherCondition)
    });

    await weatherData.save();
    console.log(`Weather data saved at ${displayTime}`);
  } catch (error) {
    console.error('Error fetching or saving weather data:', error);
  }
};

// 스케줄 설정: 매일 7시부터 18시까지 1시간 간격으로 실행
schedule.scheduleJob('0 7-18 * * *', fetchAndSaveWeatherData);

// 더미 데이터 생성 함수
const generateDummyData = () => {
  const dummyData = [];
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  
  for (let hour = 7; hour <= 18; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const airTemp = 12 + Math.random() * 8; // 12~20도 사이의 랜덤 온도
    const waterTemp = 15.3;
    
    dummyData.push({
      date,
      time,
      airTemperature: parseFloat(airTemp.toFixed(1)),
      waterTemperature: waterTemp,
      recommendedSuit: getRecommendedSuit(airTemp, waterTemp),
      weatherCondition: ['맑음', '구름많음', '흐림'][Math.floor(Math.random() * 3)]
    });
  }
  
  return dummyData;
};

// API 엔드포인트
app.get('/weather', async (req, res) => {
  try {
    // 더미 데이터 반환
    const dummyData = generateDummyData();
    res.json(dummyData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 