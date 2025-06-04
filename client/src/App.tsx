import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //2025.05.27. 장연주 추가

//Components
import ReservationViewer from "./components/LiveReservationTable/LiveReservation";
import Header from "./components/Header/Header";
import InfoSection from "./components/InfoSection/InfoSection";
import Tab from "./components/Tab/Tab";
import { Temperature } from "./types/types";

interface ApiResponse {
  temperature: number;
  humidity: number;
  water_temperature: number;
  timestamp: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"today" | "reservation">("today");
  const [temperatureData, setTemperatureData] = useState<Temperature | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // 수온에 따라 왁스 추천 - 장연주
  const getWax = (waterTemp: number | null): string => {
    if (waterTemp === null) return "-";
    if (waterTemp <= 15) return "COLD";
    if (waterTemp > 15 && waterTemp <= 20) return "COOL";
    if (waterTemp > 20 && waterTemp <= 24) return "WARM";
    return "TROPIC";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(process.env.REACT_APP_WATER_API_URL);
        const response = await fetch(process.env.REACT_APP_WATER_API_URL!!);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData: ApiResponse = await response.json();

        // 하드코딩된 날씨와 추천 왁스
        const data: Temperature = {
          temperature: apiData.temperature,
          humidity: apiData.humidity,
          water_temperature: parseFloat(apiData.water_temperature.toFixed(1)),
          weather: "맑음", // 매일 수동 업데이트
          recommendedWax: getWax(apiData.water_temperature), // water_temperature에 따른 왁스 종류 결정 - 장연주
        };
        setTemperatureData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchData();
    // 1시간마다 데이터 갱신 (Raspberry Pi가 1시간마다 전송)
    const interval = setInterval(fetchData, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const recommendations = [
    { suitType: "보드숏", condition: "보류" },
    { suitType: "스프링", condition: "출격" },
    { suitType: "3/2", condition: "출격" },
    { suitType: "3/2기모", condition: "출격" },
    { suitType: "4/3", condition: "불허" },
    { suitType: "5mm", condition: "불허" },
  ];

  const formatSession = (session: string) => {
    if (session.includes("(")) {
      const [main, sub] = session.split(" (");
      return `${main}\n(${sub}`;
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
      session1: formatSession("Lv.4\n라인업레슨"),
      time: "11:00\n ~12:00",
      session2: formatSession("초급세션 (M1, M2)"),
    },
    {
      session1: formatSession("중급세션 (M3, M4)"),
      time: "12:00\n ~13:00",
      session2: formatSession("중급세션 (M3, M4)"),
    },
    {
      session1: formatSession("Lv.5\n턴기초레슨"),
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.layout}>
        {activeTab === "today" ? (
          <div className={styles.contentContainer}>
            <InfoSection
              temperature={temperatureData}
              recommendations={recommendations}
              schedule={schedule}
            />
          </div>
        ) : (
          <ReservationViewer />
        )}
      </div>
    </div>
  );
};

export default App;
