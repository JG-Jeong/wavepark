import React from "react";
import { SuitRecommendation } from "../../types/types";
import styles from "./InfoSection.module.css";
import { Card, Table } from "react-bootstrap"; // 장연주

interface SuitRecommendationsProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendations: React.FC<SuitRecommendationsProps> = ({
  recommendations,
}) => {
  /* 2025.05.27 장연주 추가 */
  const conditionColors = {
    출격: "#033E8C",
    불허: "#D90404",
    보류: "#ebb000", //#555555 고민 중중
  };

  return (
    <Card className={`mb-3 ${styles.suitCard}`}>
      <Card.Body>
        <Card.Title className={styles.tempTitle}>슈트 추천</Card.Title>
        <Table className={styles.cTable}>
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "65%" }} />
          </colgroup>

          <tbody>
            {recommendations.map((item, index) => (
              <tr key={index}>
                <td className={styles.suitTypeSmallText}>{item.suitType}</td>
                <td
                  style={{
                    textAlign: "center",
                    color:
                      conditionColors[
                        item.condition as keyof typeof conditionColors
                      ] || "black",
                  }}
                >
                  {item.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SuitRecommendations;
