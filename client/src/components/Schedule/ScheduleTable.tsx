import React from "react";
import styles from "./Schedule.module.css";
import { ScheduleItem } from "../../types";

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <div className={styles.schedule}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.cell}>세션 1</div>
        <div className={styles.cell}>시간</div>
        <div className={styles.cell}>세션 2</div>
      </div>
      {/* 데이터 렌더링 */}
      {schedule.map((item, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>
            <div>{item.session1.title}</div>
            <div style={{ fontSize: "smaller", color: "gray" }}>
              {item.session1.subtitle}
            </div>
          </div>
          <div className={styles.cell}>{item.time}</div>
          <div className={styles.cell}>
            <div>{item.session2.title}</div>
            <div style={{ fontSize: "smaller", color: "gray" }}>
              {item.session2.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleTable;
