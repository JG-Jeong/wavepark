import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ReservationItem, ReservationResponse } from "./types";

const lambda_api_url = process.env.REACT_APP_LAMBDA_API_URL;

// Reservation 데이터를 좌,우 를 그룹화 하는 타입
interface GroupedReservation {
  시간: string;
  세션: string;
  left: string;
  right: string;
}

export default function ReservationViewer() {
  // 예약 데이터
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // 로딩시 동글뱅이 돌리려는 useState
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const dateStr = format(selectedDate, "yyyy-MM-dd");

      try {
        const res = await fetch(`${lambda_api_url}/reservation/${dateStr}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: ReservationResponse = await res.json();
        setReservations(json.data);
      } catch (e: any) {
        setError(e.message);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selectedDate]);

  // 시간+세션 키로 좌/우를 합치는 로직 # 이걸 원래 백에서 하는게 좋은겨? 프론트에서 하는거여?
  const grouped: GroupedReservation[] = reservations.reduce(
    (acc, { 시간, 세션, 방향, 남은좌석 }) => {
      // 이미 같은 시간·세션을 담은 객체가 있나 찾아보고…
      let entry = acc.find((e) => e.시간 === 시간 && e.세션 === 세션);
      if (!entry) {
        entry = { 시간, 세션, left: "-", right: "-" };
        acc.push(entry);
      }
      // 방향에 따라 left/right 채우기
      if (방향 === "좌") entry.left = `${남은좌석}/25`;
      else if (방향 === "우") entry.right = `${남은좌석}/25`;
      return acc;
    },
    [] as GroupedReservation[]
  );

  return (
    <div>
      <header>
        <h1>웨이브파크 예약현황</h1>
      </header>

      <main>
        <label>
          날짜 선택:{" "}
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => {
              const d = new Date(e.target.value);
              d.setHours(0, 0, 0, 0);
              setSelectedDate(d);
            }}
          />
        </label>

        {loading && <p>불러오는 중…</p>}
        {error && (
          <p style={{ color: "red" }}>과거의 데이터는 불러올 수 없습니다.</p>
        )}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>세션</th>
                <th>좌코브</th>
                <th>우코브</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map((row, i) => (
                <tr key={i}>
                  <td>{row.시간.split(" ")[1].slice(0, 5)}</td>
                  <td>{row.세션}</td>
                  <td>{row.left}</td>
                  <td>{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer>
        <small>
          ※ 실제 예약은{" "}
          <a
            href="https://www.wavepark.co.kr/generalbooking/reserv_main"
            target="_blank"
            rel="noreferrer"
          >
            공식 사이트
          </a>
          에서 해주세요.
        </small>
      </footer>
    </div>
  );
}
