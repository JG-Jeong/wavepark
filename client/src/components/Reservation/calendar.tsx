import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Day {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isBeforeToday: boolean;
}

function Calendar({
  pickDate,
  setPickDate,
}: {
  pickDate: string;
  setPickDate: (date: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 4, 18)); // May 18, 2025
  const [swiper, setSwiper] = useState<any>(null);

  const daysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number): number =>
    new Date(year, month, 1).getDay();

  const generateDays = (): Day[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days: Day[] = [];

    // Previous month days (for padding)
    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = daysInMonth(prevYear, prevMonth);

    for (let i = daysInPrevMonth - prevMonthDays; i <= daysInPrevMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
        isBeforeToday: true,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${i.toString().padStart(2, "0")}` === pickDate,
        isBeforeToday: i < today,
      });
    }

    return days;
  };

  const handlePrevMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    if (swiper) {
      swiper.update();
      const todayIndex = generateDays().findIndex((day) => day.isToday);
      swiper.slideTo(todayIndex, 0); // Center on today
    }
  });

  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const days: Day[] = generateDays();
  const initialIndex = days.findIndex((day) => day.isToday);

  return (
    <div className="hours max-w-sm mx-auto p-3 flex justify-center items-center min-h-screen">
      <style>
        {`
          .swiper-slide { width: auto; }
          .day-btn {
            width: 64px;
            height: 64px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2px;
            border: none;
            background: transparent;
            cursor: pointer;
          }
          .days-gray, .before-today { color: #ccc; }
          .today { background-color: #00498C; border-radius: 10px; }
          .sat { color: #1e90ff; }
          .sun { color: #ff4500; }
     
          .movedate {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f0f0f0;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            cursor: pointer;
            transition: background 0.3s;
          }
          .movedate.disabled { color: #ccc; cursor: not-allowed; }
          .month {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10px;
            font-family: 'Gmarket', sans-serif;
          }
          .movedate.prev {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .movedate.next {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .current_year {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.125rem;
          }
        `}
      </style>
      <div id="creatcalendar_wrap">
        <div className="month">
          <button
            className={`movedate prev ${
              currentDate.getMonth() === 4 && currentDate.getFullYear() === 2025
                ? "disabled"
                : ""
            }`}
            onClick={handlePrevMonth}
            disabled={
              currentDate.getMonth() === 4 && currentDate.getFullYear() === 2025
            }
          >
            ◄
          </button>
          <h2 className="current_year text-lg font-bold">
            {`${currentDate.getFullYear()}.${(currentDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`}
          </h2>
          <button className="movedate next" onClick={handleNextMonth}>
            ►
          </button>
        </div>
        <div className="day flex items-center">
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={10}
            centeredSlides={true}
            initialSlide={initialIndex}
            onSwiper={setSwiper}
            className="calrendar-swiper"
            simulateTouch={true}
            grabCursor={true}
            speed={1000}
          >
            {days.map((day, index) => (
              <SwiperSlide
                key={index}
                className={`
                  ${!day.isCurrentMonth ? "days-gray prev-date" : "days"}
                  ${day.isBeforeToday ? "before-today" : ""}
                  ${day.isToday ? "today" : ""}
                  ${daysOfWeek[index % 7] === "Sat" ? "sat" : ""}
                  ${daysOfWeek[index % 7] === "Sun" ? "sun" : ""}
                `}
              >
                <div
                  className="day-btn"
                  onClick={() => {
                    if (day.isBeforeToday) return;
                    const selectedDate = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day.day + 1
                    );
                    const dateString = selectedDate.toISOString().split("T")[0];
                    setPickDate(dateString);
                    swiper?.slideTo(index, 300);
                  }}
                >
                  <p className="txt text-sm">{daysOfWeek[index % 7]}</p>
                  <p className="num text-base">{day.day}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
