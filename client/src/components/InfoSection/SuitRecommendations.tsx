import React from "react";
import { SuitRecommendation } from "../../types";
import styles from "./InfoSection.module.css";

interface SuitRecommendationsProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendations: React.FC<SuitRecommendationsProps> = ({
  recommendations,
}) => {
  const getConditionClass = (condition: string) => {
    if (condition === "불허") return styles.notAllowed;
    if (condition === "출격") return styles.allowed;
    return "";
  };

  return (
    <div className={styles.suitContainer}>
      <table className={styles.suitTable}>
        <thead>
          <tr>
            <th colSpan={2} className={styles.header}>슈트 추천</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((item, index) => (
            <tr key={index}>
              <td>{item.suitType}</td>
              <td className={getConditionClass(item.condition)}>{item.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuitRecommendations;
