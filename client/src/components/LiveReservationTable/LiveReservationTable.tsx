// src/lib/fetch-reservations.ts
import { format } from "date-fns";
import type { ReservationRow } from "../../types/types";

/**
 * 날짜 문자열(yyyy-MM-dd)을 주면
 * 해당 날짜에 맞춰 모의 예약 데이터를 반환합니다.
 */
export async function fetchReservations(
  dateParam?: string
): Promise<ReservationRow[]> {
  // 1) 파라미터가 없으면 오늘 날짜
  const todayStr = format(new Date(), "yyyy-MM-dd");

  // 2) 문자열 → Date → day(1~31) 추출
  const ds = dateParam || todayStr;
  const date = new Date(ds);
  const day = date.getDate();

  // 3) seed 기반 mock 생성
  return generateMockReservations(day);
}

function generateMockReservations(day: number): ReservationRow[] {
  const seed = "25";

  return [
    {
      time: "10:00 ~ 11:00",
      courses: [
        {
          name: "리프상급",
          left: "17",
          right: "17",
        },
      ],
    },
    {
      time: "11:00 ~ 12:00",
      courses: [
        {
          name: "리프초급",
          left: "-",
          right: "25",
        },
      ],
    },
    {
      time: "12:00 ~ 13:00",
      courses: [
        {
          name: "리프중급",
          left: "25",
          right: "25",
        },
      ],
    },
    {
      time: "13:00 ~ 14:00",
      courses: [
        {
          name: "리프중급",
          left: "25",
          right: "25",
        },
      ],
    },
    {
      time: "14:00 ~ 15:00",
      courses: [
        {
          name: "리프상급",
          left: "17",
          right: "17",
        },
      ],
    },
    {
      time: "15:00 ~ 16:00",
      courses: [
        {
          name: "리프초급",
          left: "25",
          right: "25",
        },
      ],
    },
    {
      time: "16:00 ~ 17:00",
      courses: [
        {
          name: "리프상급",
          left: "17",
          right: "17",
        },
      ],
    },
    {
      time: "17:00 ~ 18:00",
      courses: [
        {
          name: "리프중급",
          left: "25",
          right: "25",
        },
      ],
    },
  ];
}
