import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px auto;
  width: 90%;
  max-width: 1200px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 15px;
  text-align: center;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const WeatherIcon = styled.span`
  font-size: 1.2em;
  margin-right: 5px;
`;

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/weather/last7days');
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/weather/kweather');
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    };

    fetchCurrentWeather();

    const interval = setInterval(fetchCurrentWeather, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case '맑음':
        return '☀️';
      case '흐림':
        return '☁️';
      case '비':
        return '🌧️';
      case '눈':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>날짜</Th>
            <Th>날씨</Th>
            <Th>기온 (°C)</Th>
            <Th>수온 (°C)</Th>
            <Th>슈트 추천 (mm)</Th>
          </tr>
        </thead>
        <tbody>
          {currentWeather && (
            <Tr>
              <Td>현재</Td>
              <Td>
                <WeatherIcon>{getWeatherIcon(currentWeather.weather)}</WeatherIcon>
                {currentWeather.weather}
              </Td>
              <Td>{currentWeather.airTemperature}</Td>
              <Td>-</Td>
              <Td>-</Td>
            </Tr>
          )}
          {weatherData.map((data) => (
            <Tr key={data._id}>
              <Td>{new Date(data.date).toLocaleDateString()}</Td>
              <Td>
                <WeatherIcon>{getWeatherIcon(data.weather)}</WeatherIcon>
                {data.weather}
              </Td>
              <Td>{data.airTemperature}</Td>
              <Td>{data.waterTemperature}</Td>
              <Td>{data.wetsuitThickness}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable; 