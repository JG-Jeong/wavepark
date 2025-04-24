import React from "react";
import styles from "./InfoSection.module.css";
import TemperatureInfo from "./TemperatureInfo";
import SuitRecommendations from "./SuitRecommendations";
import { Temperature, SuitRecommendation } from "../../types";

interface InfoSectionProps {
  temperature: Temperature;
  recommendations: SuitRecommendation[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
  temperature,
  recommendations,
}) => {
  const getConditionClass = (condition: string) => {
    switch (condition) {
      case '불허':
        return styles.denied;
      case '출격':
        return styles.allowed;
      case '조건부허용':
        return styles.conditional;
      default:
        return '';
    }
  };

  return (
    <div className={styles.infoSection}>
      <div className={styles.tables}>
        <TemperatureInfo data={temperature} />
        <SuitRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default InfoSection;
