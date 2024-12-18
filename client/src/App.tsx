import React from "react";
import Header from "./components/Header/Header";
import InfoSection from "./components/InfoSection/InfoSection";
import Schedule from "./components/Schedule/Schedule";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";
import styles from "./Layout.module.css";

const App: React.FC = () => {
  const temperature = {
    air: 14.2,
    water: 16.2,
    recommendedWax: "COLD",
  };

  const recommendations = [
    { suitType: "보드숏", condition: "불허" },
    { suitType: "스프링", condition: "불허" },
    { suitType: "3/2", condition: "보류" },
    { suitType: "4/3 기모", condition: "조건부 허용" },
    { suitType: "5mm", condition: "출격" },
  ];

  const schedule = [
    {
      session1: { title: "상급세션", subtitle: "M4, T1" },
      time: "10:00 ~ 11:00",
      session2: { title: "상급세션", subtitle: "M4, T1" },
    },
    {
      session1: { title: "리프레벨업", subtitle: "예약 필요!" },
      time: "11:00 ~ 12:00",
      session2: { title: "초급세션", subtitle: "M1, M2" },
    },
    {
      session1: { title: "중급세션", subtitle: "M3, M4" },
      time: "12:00 ~ 13:00",
      session2: { title: "중급세션", subtitle: "M3, M4" },
    },
    {
      session1: { title: "초급세션", subtitle: "M1, M2" },
      time: "13:00 ~ 14:00",
      session2: { title: "리프레벨업", subtitle: "예약 필요!" },
    },
    {
      session1: { title: "중급세션", subtitle: "M2, M3, M4 " },
      time: "14:00 ~ 15:00",
      session2: { title: "중급세션", subtitle: "M2, M3, M4" },
    },
    {
      session1: { title: "초급세션", subtitle: "M2, M3" },
      time: "15:00 ~ 16:00",
      session2: { title: "초급세션", subtitle: "M2, M3" },
    },
    {
      session1: { title: "중급세션", subtitle: "M4" },
      time: "16:00 ~ 17:00",
      session2: { title: "중급세션", subtitle: "M4" },
    },
    {
      session1: { title: "상급세션", subtitle: "T1, T2" },
      time: "17:00 ~ 18:00",
      session2: { title: "상급세션", subtitle: "T1, T2" },
    },
  ];

  return (
    <div>
      <Header />
      <div className={styles.box}>
        <div className={styles.layout}>
          <InfoSection
            temperature={temperature}
            recommendations={recommendations}
          />
          <Schedule schedule={schedule} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
