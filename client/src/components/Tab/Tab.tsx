import React from "react";
import styles from "./Tab.module.css";

interface TabProps {
  activeTab: "suit" | "reservation";
  onTabChange: (tab: "suit" | "reservation") => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${activeTab === "suit" ? styles.active : ""}`}
        onClick={() => onTabChange("suit")}
      >
        오늘 슈트 추천
      </button>
      <button
        className={`${styles.tab} ${
          activeTab === "reservation" ? styles.active : ""
        }`}
        onClick={() => onTabChange("reservation")}
      >
        예약 현황
      </button>
    </div>
  );
};

export default Tab;
