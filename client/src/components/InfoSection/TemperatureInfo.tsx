import React from "react";
import { Temperature } from "../../types";

interface TemperatureInfoProps {
  data: Temperature;
}

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  return (
    <div>
      <p>
        <strong>기온:</strong> {data.air}°C
      </p>
      <p>
        <strong>수온:</strong> {data.water}°C
      </p>
      <p>
        <strong>추천왁스:</strong> {data.recommendedWax}
      </p>
    </div>
  );
};

export default TemperatureInfo;
