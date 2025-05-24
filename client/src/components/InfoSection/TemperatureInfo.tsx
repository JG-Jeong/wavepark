import React from "react";
import styles from "./InfoSection.module.css";
import { Temperature } from "../../types/types";

interface TemperatureInfoProps {
  data: Temperature;
}

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  // 날씨에 따라 데이터를 넣고 이모지도 넣는 함수
  const getWeatherEmoji = (weather: string) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes("맑음") || weatherLower.includes("clear"))
      return "☀️맑음";
    if (weatherLower.includes("구름") || weatherLower.includes("cloud"))
      return "☁️구름";
    if (weatherLower.includes("비") || weatherLower.includes("rain"))
      return "🌧️비";
    if (weatherLower.includes("눈") || weatherLower.includes("snow"))
      return "❄️눈";
    if (weatherLower.includes("흐림") || weatherLower.includes("cloud"))
      return "🌤️흐림";
    return "";
  };

  // 날씨에 따라 왁스 추천
  const getWaxEmoji = (wax: string) => {
    switch (wax) {
      case "COOL":
        return "❄️";
      case "COLD":
        return "🥶";
      case "WARM":
        return "🌡️";
      case "TROPIC":
        return "🔥";
      default:
        return "";
    }
  };

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>날씨</td>
          <td>{getWeatherEmoji(data.weather)}</td>
        </tr>
        <tr>
          <td>기온</td>
          <td>19°C</td>
        </tr>
        <tr>
          <td>수온</td>
          <td>20.9°C</td>
        </tr>
        <tr>
          <td>추천왁스</td>
          <td>
            {getWaxEmoji(data.recommendedWax)} {data.recommendedWax}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TemperatureInfo;
