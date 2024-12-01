import React from "react";
import { SuitRecommendation } from "../../types";

interface SuitRecommendationsProps {
  recommendations: SuitRecommendation[];
}

const SuitRecommendations: React.FC<SuitRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div>
      <h2>추천 슈트</h2>
      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>
            {item.suitType}: {item.condition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuitRecommendations;
