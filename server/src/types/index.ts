export interface Temperature {
    air: number; // 기온
    water: number; // 수온
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
  