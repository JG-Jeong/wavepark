import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  // 현재 날짜 가져오기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className={styles.header}>
      <h2>웨이브파크 수온 알리미</h2>
      <p className={styles.date}>{formattedDate}</p>
    </div>
  );
};

export default Header;
