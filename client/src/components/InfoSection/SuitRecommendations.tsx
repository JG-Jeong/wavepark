import React from "react";
import styles from "./SuitRecommendations.module.css";
import { SuitRecommendation } from "../../types";

interface SuitRecommendationsProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendations: React.FC<SuitRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div className={styles.suitRecommendations}>
      <div className={styles.header}>슈트 추천</div>
      {recommendations.map((item, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>{item.suitType}</div>
          <div className={styles.cell}>{item.condition}</div>
        </div>
      ))}
    </div>
  );
};

export default SuitRecommendations;
