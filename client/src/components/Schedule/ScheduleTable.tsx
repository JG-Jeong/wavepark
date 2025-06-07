import React from "react";
import { Card } from "react-bootstrap"; //장연주
import styles from "./Schedule.module.css";
import { ScheduleItem } from "../../types/types";

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

//App.tsx에서 값 호출 시 \n에 태그 부여 - 장연주
const formatTextBreak = (text: string): React.ReactNode[] => {
  const lines = text.split("\n");

  const result: React.ReactNode[] = [];
  lines.forEach((line, lineIndex) => {
    const match = line.match(/\(.*?\)/);
    if (match) {
      const [parenText] = match;
      const mainText = line.replace(parenText, "").trim();

      result.push(
        <React.Fragment key={`${lineIndex}-main`}>{mainText}</React.Fragment>
      );
      result.push(
        <React.Fragment key={`${lineIndex}-paren`}>
          <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            {parenText}
          </span>
          {lineIndex !== lines.length - 1 && <br />}
        </React.Fragment>
      );
    } else {
      result.push(
        <React.Fragment key={lineIndex}>
          {line}
          {lineIndex !== lines.length - 1 && <br />}
        </React.Fragment>
      );
    }
  });
  return result;
};

// 수준 별 컬러 부여 - 장연주
const sessionColors = (text: string): string => {
  if (text.includes("상급")) return "#D90404";
  else if (text.includes("중급")) return "#187FD9";
  else return "#F29F05";
};

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <Card className={`mb-3 ${styles.scheduleCard}`}>
      <Card.Body>
        <Card.Title className={styles.tempTitle}>운영 일정</Card.Title>
        <div className={styles.scheduleTable}>
          <div className={styles.scheduleRow}>
            <div className={styles.TopsessionBox}>좌코브</div>
            <div className={styles.ToptimeBox}>시간</div>
            <div className={styles.TopsessionBox}>우코브</div>
          </div>

          {schedule.map((item, index) => (
            <div className={styles.scheduleRow} key={index}>
              <div
                className={styles.sessionBox}
                style={{
                  textAlign: "center",
                  backgroundColor: sessionColors(item.session1),
                }}
              >
                {formatTextBreak(item.session1)}
              </div>
              <div
                className={styles.timeBox}
                style={{
                  textAlign: "center",
                  borderWidth: "1.5px",
                  borderColor: sessionColors(item.session1),
                }}
              >
                {formatTextBreak(item.time)}
              </div>
              <div
                className={styles.sessionBox}
                style={{
                  textAlign: "center",
                  backgroundColor: sessionColors(item.session2),
                }}
              >
                {formatTextBreak(item.session2)}
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScheduleTable;
