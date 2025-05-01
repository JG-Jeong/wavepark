import React from "react";
import styles from './InfoSection.module.css';
import { Temperature } from "../../types";

interface TemperatureInfoProps {
  data: Temperature;
}

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  const getWeatherEmoji = (weather: string) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes('맑음') || weatherLower.includes('clear')) return '☀️';
    if (weatherLower.includes('흐림') || weatherLower.includes('cloud')) return '☁️';
    if (weatherLower.includes('비') || weatherLower.includes('rain')) return '🌧️';
    if (weatherLower.includes('눈') || weatherLower.includes('snow')) return '❄️';
    return '🌤️';
  };

  const getWaxEmoji = (wax: string) => {
    switch(wax) {
      case 'COOL':
        return '❄️';
      case 'COLD':
        return '🥶';
      case 'WARM':
        return '🌡️';
      case 'TROPIC':
        return '🔥';
      default:
        return '';
    }
  };

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>날씨</td>
          <td>흐림</td>
        </tr>
        <tr>
          <td>기온</td>
          <td>16.4°C</td>
        </tr>
        <tr>
          <td>수온</td>
          <td>16.4°C</td>
        </tr>
        <tr>
          <td>추천왁스</td>
          <td>{getWaxEmoji(data.recommendedWax)} {data.recommendedWax}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TemperatureInfo;
