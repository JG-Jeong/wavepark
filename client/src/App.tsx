import React, { useEffect, useState } from 'react';
import Header from "./components/Header/Header";
import InfoSection from "./components/InfoSection/InfoSection";
import Schedule from "./components/Schedule/Schedule";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";
import styles from "./Layout.module.css";
import './components/InfoSection/InfoSection.module.css';
import './App.css';

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  airTemp: number;
  waterTemp: number;
  weather: string;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const temperature = {
    weather: weatherData?.weather || '맑음',
    air: 12.2,
    water: 15.4,
    recommendedWax: 'COOL'
  };

  const recommendations = [
    { suitType: "보드숏", condition: "불허" },
    { suitType: "스프링", condition: "불허" },
    { suitType: "3/2", condition: "조건부허용" },
    { suitType: "3/2 기모", condition: "출격" },
    { suitType: "4/3", condition: "출격" },  
    { suitType: "4/3 기모", condition: "출격" },
    { suitType: "5mm", condition: "출격" },
  ];

  const formatSession = (session: string) => {
    if (session.includes("(")) {
      const [main, sub] = session.split(" (");
      return `${main}<br />(${sub}`;
    }
    return session;
  };

  const schedule = [
    { session1: formatSession("상급세션 (M4, T1)"), time: "10:00\n ~11:00", session2: formatSession("상급세션 (M4, T1)") },
    { session1: formatSession("Lv.4 라인업레슨"), time: "11:00\n ~12:00", session2: formatSession("초급세션 (M1, M2)") },
    { session1: formatSession("중급세션 (M3, M4)"), time: "12:00\n ~13:00", session2: formatSession("중급세션 (M3, M4)") },
    { session1: formatSession("Lv.5 턴기초레슨"), time: "13:00\n ~14:00", session2: formatSession("초급세션 (M1, M2)") },
    { session1: formatSession("상급세션 (M4)"), time: "14:00\n ~15:00", session2: formatSession("상급세션 (M4)") },
    { session1: formatSession("초급세션 (M2, M3)"), time: "15:00\n ~16:00", session2: formatSession("초급세션 (M2, M3)") },
    { session1: formatSession("상급세션 (T1 T2)"), time: "16:00\n ~17:00", session2: formatSession("상급세션 (T1 T2)") },
    { session1: formatSession("중급세션 (M2, M3, M4)"), time: "17:00\n ~18:00", session2: formatSession("중급세션 (M2, M3, M4)") },
  ];

  const getConditionClass = (condition: string) => {
    switch (condition) {
      case '불허':
        return styles.denied;
      case '출격':
        return styles.allowed;
      case '조건부허용':
        return styles.conditional;
      default:
        return '';
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/weather');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
    // 1시간마다 날씨 정보 업데이트
    const interval = setInterval(fetchWeather, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <InfoSection
          temperature={temperature}
          recommendations={recommendations}
        />
        <Schedule schedule={schedule} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
