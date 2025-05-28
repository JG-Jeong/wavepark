export interface Temperature {
  temperature: number; // API: 기온
  humidity: number; // API: 습도
  water_temperature: number; // API: 수온
  weather: string; // 하드코딩: 날씨
  recommendedWax: string; // 하드코딩: 추천 왁스
  timestamp?: string; // API: 선택적, 사용하지 않음
}

export interface SuitRecommendation {
  suitType: string;
  condition: string;
}

export interface ScheduleItem {
  session1: string;
  time: string;
  session2: string;
}

export interface Schedule {
  schedule: ScheduleItem[];
}

export interface Course {
  name: string;
  left: string | number;
  right: string | number;
}

export interface ReservationRow {
  time: string;
  courses: Course[];
}
