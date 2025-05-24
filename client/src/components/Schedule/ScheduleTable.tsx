import React from "react";
import styles from "./Schedule.module.css";
import { ScheduleItem } from "../../types/types";

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const getSessionClass = (session: string) => {
  if (session.includes("상급세션")) return styles.advancedSession;
  if (session.includes("중급세션")) return styles.intermediateSession;
  if (session.includes("초급세션")) return styles.beginnerSession;
  if (
    session.includes("Lv.4 라인업레슨") ||
    session.includes("Lv.5 턴기초레슨")
  )
    return styles.lineupLesson;
  return "";
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
        {schedule.map((item, index) => (
          <tr key={index}>
            <td
              className={getSessionClass(item.session1)}
              dangerouslySetInnerHTML={{ __html: item.session1 }}
            />
            <td>{item.time}</td>
            <td
              className={getSessionClass(item.session2)}
              dangerouslySetInnerHTML={{ __html: item.session2 }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
