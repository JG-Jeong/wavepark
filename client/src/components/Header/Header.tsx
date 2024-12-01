import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1>웨이브파크 수온 알리미</h1>
      <p>2024-10-31</p>
    </div>
  );
};

export default Header;
