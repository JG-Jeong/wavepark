export interface Temperature {
  weather: string; // 날씨
  airTemp: number; // 기온
  waterTemp: number; // 수온
  recommendedWax: string; //추천왁스
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
