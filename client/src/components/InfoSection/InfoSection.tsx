import React from "react";
import { Container } from "react-bootstrap"; //장연주

import styles from "./InfoSection.module.css";
import TemperatureInfo from "./TemperatureInfo";
import SuitRecommendations from "./SuitRecommendations";
import ScheduleTable from "../Schedule/ScheduleTable"; //장연주
import {
  Temperature,
  SuitRecommendation,
  ScheduleItem,
} from "../../types/types"; //장연주

/* 왼쪽에 온도 오른쪽에 슈트 정보 오게 설정  - 장연주 */
interface InfoSectionProps {
  temperature: Temperature | null; //null허용
  recommendations: SuitRecommendation[];
  schedule: ScheduleItem[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
  temperature,
  recommendations,
  schedule,
}) => {
  return (
    <Container className={styles.containerWrap}>
      <div className={styles.cardRow}>
        <div className={styles.cardColLeft}>
          <TemperatureInfo data={temperature} />
        </div>
        <div className={styles.cardColRight}>
          <SuitRecommendations recommendations={recommendations} />
        </div>
      </div>
      <div className={styles.fullCardRow}>
        <ScheduleTable schedule={schedule} />
      </div>
    </Container>
  );
};

export default InfoSection;
