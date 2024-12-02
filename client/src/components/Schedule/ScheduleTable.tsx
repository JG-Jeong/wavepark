import React from "react";
import styles from "./Schedule.module.css";
import { ScheduleItem } from "../../types";

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>세션</th>
          <th>시간</th>
          <th>세션</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item, index) => (
          <tr key={index}>
            <td>{item.session1}</td>
            <td>{item.time}</td>
            <td>{item.session2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
