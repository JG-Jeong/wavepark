const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');
const axios = require('axios');

// 날씨 정보 저장
router.post('/', async (req, res) => {
    try {
        const { airTemperature, waterTemperature, weather, wetsuitThickness } = req.body;
        
        const weatherData = new Weather({
            airTemperature,
            waterTemperature,
            weather,
            wetsuitThickness
        });

        await weatherData.save();
        res.status(201).json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
});

// 오늘의 날씨 정보 조회
router.get('/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weatherData = await Weather.findOne({
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!weatherData) {
            return res.status(404).json({ message: '오늘의 날씨 정보가 없습니다.' });
        }

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
});

// 최근 7일간의 날씨 정보 조회
router.get('/last7days', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weatherData = await Weather.find({
            date: {
                $gte: sevenDaysAgo,
                $lt: today
            }
        }).sort({ date: -1 });

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
});

// 샘플 데이터 생성
router.post('/sample', async (req, res) => {
    try {
        // 기존 데이터 삭제
        await Weather.deleteMany({});
        
        const sampleData = [
            {
                airTemperature: 25,
                waterTemperature: 0,
                weather: '맑음',
                wetsuitThickness: 3,
                date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 23,
                waterTemperature: 0,
                weather: '흐림',
                wetsuitThickness: 3,
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 22,
                waterTemperature: 0,
                weather: '비',
                wetsuitThickness: 4,
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 24,
                waterTemperature: 0,
                weather: '맑음',
                wetsuitThickness: 3,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 26,
                waterTemperature: 0,
                weather: '맑음',
                wetsuitThickness: 2,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 27,
                waterTemperature: 0,
                weather: '흐림',
                wetsuitThickness: 2,
                date: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            {
                airTemperature: 28,
                waterTemperature: 0,
                weather: '맑음',
                wetsuitThickness: 2,
                date: new Date()
            }
        ];

        await Weather.insertMany(sampleData);
        res.status(201).json({ message: '샘플 데이터가 생성되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
});

// 현재 날씨 정보 가져오기
router.get('/current', async (req, res) => {
    try {
        // OpenWeatherMap API 호출
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        
        const weatherData = {
            airTemperature: Math.round(response.data.main.temp),
            weather: response.data.weather[0].main === 'Clear' ? '맑음' : 
                    response.data.weather[0].main === 'Clouds' ? '흐림' :
                    response.data.weather[0].main === 'Rain' ? '비' : '흐림',
            date: new Date()
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: '날씨 정보를 가져오는데 실패했습니다.' });
    }
});

// 케이웨더 API로 현재 날씨 정보 가져오기
router.get('/kweather', async (req, res) => {
    try {
        const response = await axios.get('https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php', {
            params: {
                authKey: process.env.KWEATHER_API_KEY,
                stn: '108', // 서울
                tm: new Date().toISOString().slice(0, 13).replace('T', '') // YYYYMMDDHH 형식
            }
        });

        // 응답 데이터 파싱
        const weatherData = parseKWeatherResponse(response.data);
        
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching KWeather data:', error);
        res.status(500).json({ message: '날씨 정보를 가져오는데 실패했습니다.' });
    }
});

// 케이웨더 응답 데이터 파싱 함수
function parseKWeatherResponse(data) {
    // 응답 데이터 파싱 로직
    // 예시: 기온과 날씨 정보 추출
    return {
        airTemperature: parseFloat(data.temp), // 기온
        weather: data.weather, // 날씨 상태
        date: new Date()
    };
}

module.exports = router; 