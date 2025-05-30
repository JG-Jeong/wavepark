import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap"; //장연주
import styles from "./InfoSection.module.css";
import { Temperature } from "../../types/types";
import tempLogo from "../../styles/watertempLogo.png"; //장연주
import { getWeatherImage } from "./WeatherInfo"; //장연주주

interface TemperatureInfoProps {
  data: Temperature | null;
}

// 현재 날짜 가져오기 - 장연주
const today = new Date();
const formattedDate = `${String(today.getMonth() + 1).padStart(
  2,
  "0"
)}/${String(today.getDate()).padStart(2, "0")}`;

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  /* 날씨에 따라 데이터를 넣고 이모지도 넣는 함수 - 날씨 맞춤 이미지로 변경경 - 장연주
  const getWeatherImage = (weather: string): string => {
    const weatherLower = weather?.toLowerCase();

    const imageMap: Record<WeatherType | string, string> = {
      맑음: '../../styles/sunny.png',
      구름많음: '../../styles/suncloudy.png',
      흐림: "../../styles/overcast_cloud.png",
      비: '../../styles/heavy_rain.png',
      눈: '../../styles/snow_cloud.png'
    };
    return imageMap[weatherLower] ?? sunnyImg;
  };*/

  // 날씨에 따라 왁스 추천 - 사용 안함 - 장연주
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

  //null check: API 수신 전 null인 경우 '-'로 표기
  const getDisplayValue = (
    value: number | string | null | undefined,
    unit: string = ""
  ) => {
    return value !== undefined && value !== null ? `${value}${unit}` : "-";
  };

  return (
    <Card className={`mb-3 text-white ${styles.tempCard}`}>
      <Card.Body>
        <Card.Title className={styles.tempTitle}>{formattedDate}</Card.Title>
        <Row className={`text-center mt-1 ${styles.tempContents}`}>
          <Col className="d-flex justify-content-center align-items-center">
            <img className={styles.logoSize} src={tempLogo} />
          </Col>
          <Col>
            <div className={styles.cText}>
              {getDisplayValue(data?.recommendedWax)}
            </div>
            <div className={styles.cText}>
              {getDisplayValue(data?.water_temperature, "℃")}
            </div>
            <div className={styles.cText}>
              {getDisplayValue(data?.humidity, "%")}
            </div>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <img
              className={styles.logoSize}
              src={getWeatherImage(data?.weather ?? "")}
            />
          </Col>
          <Col>
            <div className={styles.cText}>{getDisplayValue(data?.weather)}</div>
            <div className={styles.cText}>
              {getDisplayValue(data?.temperature, "℃")}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TemperatureInfo;
