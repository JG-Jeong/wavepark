import React from "react";
import styles from "./TemperatureInfo.module.css";
import { Temperature } from "../../types";

interface TemperatureInfoProps {
  data: Temperature;
}

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  return (
    <div className={styles.temperatureInfo}>
      <div className={styles.row}>
        <div className={styles.label}>기온</div>
        <div className={styles.value}>{data.air}°C</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>수온</div>
        <div className={styles.value}>{data.water}°C</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>추천왁스</div>
        <div className={styles.value}>{data.recommendedWax}</div>
      </div>
    </div>
  );
};

export default TemperatureInfo;
