import React from "react";
import styles from "./Schedule.module.css";
import { ScheduleItem } from "../../types";

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const getSessionColor = (session: string): string => {
  if (session.includes("상급세션")) return "#ff6b6b"; // 빨간색
  if (session.includes("중급세션")) return "#4dabf7"; // 파란색
  if (session.includes("초급세션")) return "#ffa94d"; // 주황색
  return "transparent";
};

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>좌코브</th>
          <th>시간</th>
          <th>우코브</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item, index) => {
          // 각 행에 대해 동일한 색상을 적용하기 위해 하나의 색상만 결정
          const rowColor = getSessionColor(item.session1);
          
          return (
            <tr key={index}>
              <td style={{ backgroundColor: rowColor }}>
                {item.session1}
              </td>
              <td>{item.time}</td>
              <td style={{ backgroundColor: rowColor }}>
                {item.session2}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
