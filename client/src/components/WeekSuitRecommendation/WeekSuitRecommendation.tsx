import React, { useEffect, useState } from "react";
import styles from "./WeekSuitRecommendation.module.css";
import { getLast7DaysWeather, WeatherData, MaintenanceError } from "../../services/weatherService";

const WeekSuitRecommendation: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getLast7DaysWeather();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof MaintenanceError) {
          setError(err.message);
        } else {
          setError('날씨 데이터를 불러오는데 실패했습니다.');
        }
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // 한국의 공휴일 체크 함수
  const isKoreanHoliday = (date: Date): boolean => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 2025년 공휴일 목록
    const holidays = [
      '2025-01-01', // 신정
      '2025-01-28', // 설날
      '2025-01-29', // 설날
      '2025-01-30', // 설날
      '2025-03-01', // 삼일절
      '2025-05-01', // 근로자의 날
      '2025-05-05', // 어린이날
      '2025-05-06', // 어린이날 대체공휴일
      '2025-05-15', // 부처님 오신 날
      '2025-06-06', // 현충일
      '2025-08-15', // 광복절
      '2025-10-03', // 개천절
      '2025-10-06', // 추석
      '2025-10-07', // 추석
      '2025-10-08', // 추석
      '2025-10-09', // 한글날
      '2025-12-25', // 성탄절
    ];
    
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return holidays.includes(dateStr);
  };

  // 오늘부터 과거 7일의 날짜와 요일 계산
  const getPastWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    // 6일 전부터 오늘까지의 날짜를 생성
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const day = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
      const isHoliday = isKoreanHoliday(date);
      const isSunday = day === 0;
      
      dates.push({
        date: date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
        day: ['일', '월', '화', '수', '목', '금', '토'][day],
        isHoliday,
        isSaturday: day === 6,
        isSunday
      });
    }
    
    return dates;
  };

  const weekDates = getPastWeekDates();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>지난 슈트 추천</h2>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.weekSuitRecommendation}>
      <h2>지난 슈트 추천</h2>
      <div className={styles.tableContainer}>
        <table className={styles.recommendationTable}>
          <thead>
            <tr>
              {weekDates.map((date, index) => (
                <th 
                  key={index}
                  className={`${styles.dateCell} ${
                    date.isHoliday || date.isSunday ? styles.holiday : 
                    date.isSaturday ? styles.saturday : ''
                  }`}
                >
                  <div>{date.date}</div>
                  <div className={`${
                    date.isHoliday || date.isSunday ? styles.holiday : 
                    date.isSaturday ? styles.saturday : ''
                  }`}>{date.day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((_, index) => {
                const weather = weatherData[index];
                return (
                  <td key={index} className={styles.contentCell}>
                    {weather ? `${weather.wetsuitThickness}/3 기모` : '데이터 없음'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeekSuitRecommendation; 