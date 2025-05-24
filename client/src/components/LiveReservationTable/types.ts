export interface ReservationItem {
  시간: string;
  세션: string;
  방향: "좌" | "우";
  남은좌석: string;
}

export interface ReservationResponse {
  date: string;
  data: ReservationItem[];
}
