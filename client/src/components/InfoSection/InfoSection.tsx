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
  return (
    <div className={styles.infoSection}>
      <TemperatureInfo data={temperature} />
      <SuitRecommendations recommendations={recommendations} />
    </div>
  );
};

export default InfoSection;
