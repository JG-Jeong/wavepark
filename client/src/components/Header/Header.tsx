import React from "react";
import styles from "./Header.module.css";
import wpci from "./waveparkLogo.png"; // 장연주

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.ciWrap}>
        <img className={styles.ciSize} src={wpci} />
        <span className={styles.ciText}>수온 알리미</span>
      </div>
    </div>
  );
};

export default Header;
