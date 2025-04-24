import React from "react";
import styles from "./SuitRecommendations.module.css";
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
<<<<<<< HEAD
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
=======
    <div className={styles.suitRecommendations}>
      <div className={styles.header}>슈트 추천</div>
      {recommendations.map((item, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>{item.suitType}</div>
          <div className={styles.cell}>{item.condition}</div>
        </div>
      ))}
>>>>>>> e3c9f503eb226f391f8c15a87320df2709ca8fca
    </div>
  );
};

export default SuitRecommendations;
