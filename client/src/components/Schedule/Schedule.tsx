import React from "react";
import styles from "./Schedule.module.css";
import ScheduleTable from "./ScheduleTable";
import { ScheduleItem } from "../../types";

interface ScheduleProps {
  schedule: ScheduleItem[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  return (
    <div className={styles.schedule}>
      <h2>운영 일정</h2>
      <ScheduleTable schedule={schedule} />
    </div>
  );
};

export default Schedule;
