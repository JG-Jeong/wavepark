import { format } from "date-fns";
import { ReservationRow } from "../../types/types";

interface ReservationViewerProps {
  today: Date;
  selectedDate: Date;
  loading: boolean;
  data: ReservationRow[];
  onDateChange: (date: Date) => void;
}

export default function ReservationViewer({
  today,
  selectedDate,
  loading,
  data,
  onDateChange,
}: ReservationViewerProps) {
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
            onChange={(e) => onDateChange(new Date(e.target.value))}
          />
        </label>

        {loading ? (
          <p>불러오는 중…</p>
        ) : data.length === 0 ? (
          <div>
            <p>예약 데이터가 없습니다.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>강습명</th>
                <th>좌석</th>
                <th>웨이브 좌</th>
                <th>웨이브 우</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, ri) =>
                row.courses.map((c, ci) => (
                  <tr key={`${ri}-${ci}`}>
                    {ci === 0 && (
                      <td rowSpan={row.courses.length}>{row.time}</td>
                    )}
                    <td>{c.name}</td>
                    <td>
                      {c.left}/{c.left}
                    </td>
                  </tr>
                ))
              )}
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
