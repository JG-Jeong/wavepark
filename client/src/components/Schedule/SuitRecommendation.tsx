import React from "react";
import styles from "./Schedule.module.css";
import { SuitRecommendation } from "../../types";

interface SuitRecommendationListProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendationList: React.FC<SuitRecommendationListProps> = ({ recommendations }) => {
  return (
    <div className={styles.suitRecommendation}>
      <h3>지난 일주일 추천 슈트</h3>
      <div className={styles.recommendationList}>
        {recommendations.map((recommendation, index) => (
          <div key={index} className={styles.recommendationItem}>
            <span className={styles.suitType}>{recommendation.suitType}</span>
            <span className={styles.condition}>{recommendation.condition}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuitRecommendationList; 