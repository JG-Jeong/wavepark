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
        <Card.Title className={`${styles.tempTitle} ${styles.cText}`}>
          {formattedDate}
        </Card.Title>
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
