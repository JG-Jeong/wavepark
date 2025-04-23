import React from "react";
import styles from "./Header.module.css";
import logo from "../../logo/WAVEPARK logo_color.png";

const Header: React.FC = () => {
  // 현재 날짜 가져오기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className={styles.header}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>웨이브파크 수온 알리미</h1>
        <img src={logo} alt="Wavepark Logo" className={styles.logo} />
      </div>
      <p className={styles.date}>{formattedDate}</p>
    </div>
  );
};

export default Header;
