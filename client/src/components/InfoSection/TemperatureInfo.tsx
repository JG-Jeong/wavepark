import React from "react";
import { Temperature } from "../../types";

interface TemperatureInfoProps {
  data: Temperature;
}

const TemperatureInfo: React.FC<TemperatureInfoProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>기온</td>
          <td>{data.air}°C</td>
        </tr>
        <tr>
          <td>수온</td>
          <td>{data.water}°C</td>
        </tr>
        <tr>
          <td>추천왁스</td>
          <td>{data.recommendedWax}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TemperatureInfo;
