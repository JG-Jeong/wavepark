import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>* 추천은 참고용이며 책임은 지지 않습니다.</p>
      <p>by @seo_fing, @jeong_jeong_florence</p>
    </footer>
  );
};

export default Footer;
