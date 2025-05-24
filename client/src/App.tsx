import React, { useEffect, useState } from "react";
import "./styles/global.css";
import styles from "./Layout.module.css";
import "./App.css";
import { ReservationRow } from "./types/types";

//Components
import ReservationViewer from "./components/LiveReservationTable/LiveReservation";
import "./components/InfoSection/InfoSection.module.css";
import Header from "./components/Header/Header";
import InfoSection from "./components/InfoSection/InfoSection";
import Schedule from "./components/Schedule/Schedule";
import Tab from "./components/Tab/Tab";
import Footer from "./components/Footer/Footer";

// Hooks
import { useWaterTemp } from "./hooks/useWaterTemp";

const WATER_API_URL = process.env.REACT_APP_WATER_API_URL!;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"today" | "reservation">("today");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationRow[]>([]);

  const temperature = {
    //수정 필요. 날씨 데이터 불러와서 기록할것.
    weather: "맑음",
    //수정필요. 날씨 데이터 불러와서 기록할것. 기상청
    airTemp: 22,
    // waterTemp: waterData!.temperature,
    waterTemp: 20.9,
    recommendedWax: "WARM" as const,
  };

  const recommendations = [
    { suitType: "보드숏", condition: "보류" },
    { suitType: "스프링", condition: "출격" },
    { suitType: "3/2", condition: "출격" },
    { suitType: "3/2 기모", condition: "출격" },
    { suitType: "4/3", condition: "출격" },
    { suitType: "4/3 기모", condition: "불허" },
    { suitType: "5mm", condition: "불허" },
  ];

  const formatSession = (session: string) => {
    if (session.includes("(")) {
      const [main, sub] = session.split(" (");
      return `${main}<br />(${sub}`;
    }
    return session;
  };

  const schedule = [
    {
      session1: formatSession("상급세션 (M4, T1)"),
      time: "10:00\n ~11:00",
      session2: formatSession("상급세션 (M4, T1)"),
    },
    {
      session1: formatSession("Lv.4 라인업레슨"),
      time: "11:00\n ~12:00",
      session2: formatSession("초급세션 (M1, M2)"),
    },
    {
      session1: formatSession("중급세션 (M3, M4)"),
      time: "12:00\n ~13:00",
      session2: formatSession("중급세션 (M3, M4)"),
    },
    {
      session1: formatSession("Lv.5 턴기초레슨"),
      time: "13:00\n ~14:00",
      session2: formatSession("초급세션 (M1, M2)"),
    },
    {
      session1: formatSession("상급세션 (M4)"),
      time: "14:00\n ~15:00",
      session2: formatSession("상급세션 (M4)"),
    },
    {
      session1: formatSession("초급세션 (M2, M3)"),
      time: "15:00\n ~16:00",
      session2: formatSession("초급세션 (M2, M3)"),
    },
    {
      session1: formatSession("상급세션 (T1 T2)"),
      time: "16:00\n ~17:00",
      session2: formatSession("상급세션 (T1 T2)"),
    },
    {
      session1: formatSession("중급세션 (M2, M3, M4)"),
      time: "17:00\n ~18:00",
      session2: formatSession("중급세션 (M2, M3, M4)"),
    },
  ];

  return (
    <div>
      <Header />
      <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.layout}>
        {activeTab === "today" ? (
          <div className={styles.contentContainer}>
            <InfoSection
              temperature={temperature}
              recommendations={recommendations}
            />
            <Schedule schedule={schedule} />
          </div>
        ) : (
          <ReservationViewer
            today={new Date()}
            selectedDate={selectedDate}
            loading={loading}
            data={reservationData}
            onDateChange={setSelectedDate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
