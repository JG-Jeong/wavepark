import React from "react";
import { SuitRecommendation } from "../../types";

interface SuitRecommendationsProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendations: React.FC<SuitRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>슈트 추천</th>
        </tr>
      </thead>
      <tbody>
        {recommendations.map((item, index) => (
          <tr key={index}>
            <td>{item.suitType}</td>
            <td>{item.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SuitRecommendations;
