import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Container, Table, Form, Alert } from "react-bootstrap";
import { ReservationItem, ReservationResponse } from "./types";
import styles from "./LiveReservation.module.css";

const WEEKEND_DATES = [
  "2025-06-07",
  "2025-06-08",
  "2025-06-14",
  "2025-06-15",
  "2025-06-21",
  "2025-06-22",
  "2025-06-28",
  "2025-06-29",
];

interface ReservationViewerProps {
  initialData: ReservationItem[];
  initialDate: string;
  updateData: (dateStr: string) => Promise<void>;
}

interface GroupedReservation {
  시간: string;
  세션: string;
  left: string;
  right: string;
  night?: string;
}

export default function ReservationViewer({
  initialData,
  initialDate,
  updateData,
}: ReservationViewerProps) {
  const [reservations, setReservations] =
    useState<ReservationItem[]>(initialData);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date(initialDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReservations(initialData);
    setError(null);
  }, [initialData]);

  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    if (dateStr !== initialDate) {
      const load = async () => {
        setLoading(true);
        setError(null);
        try {
          await updateData(dateStr);
        } catch (e: any) {
          setError("과거의 데이터는 불러올 수 없습니다.");
          setReservations([]);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [selectedDate, initialDate, updateData]);

  const grouped: GroupedReservation[] = reservations.reduce(
    (acc, { 시간, 세션, 방향, 남은좌석 }) => {
      const timeOnly = 시간.split(" ")[1].slice(0, 5);
      const isNightSession = timeOnly.startsWith("18:00");
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const isWeekend = WEEKEND_DATES.includes(dateStr);

      // 18:00 세션의 "알 수 없음" 처리
      let mappedSession = 세션;
      if (isNightSession && 세션 === "알 수 없음" && isWeekend) {
        const sessionType = weekendSessionMap[dateStr]?.["초급"]
          ? "초급"
          : "중급";
        mappedSession = `나이트 ${sessionType}`;
      } else if (isNightSession) {
        mappedSession = `나이트 ${세션}`;
      }

      let entry = acc.find(
        (e) =>
          e.시간 === (isNightSession ? "18:00~22:00" : timeOnly) &&
          e.세션 === (isNightSession ? mappedSession : 세션)
      );

      if (!entry) {
        entry = {
          시간: isNightSession ? "18:00~22:00" : timeOnly,
          세션: isNightSession ? mappedSession : 세션,
          left: "-",
          right: "-",
          night: isNightSession ? `${남은좌석}/60` : undefined,
        };
        acc.push(entry);
      }

      const capacity = 세션 === "상급" ? 17 : 25;

      if (!isNightSession) {
        if (방향 === "좌") entry.left = `${남은좌석}/${capacity}`;
        else if (방향 === "우") entry.right = `${남은좌석}/${capacity}`;
      }

      return acc;
    },
    [] as GroupedReservation[]
  );

  const isWeekend = WEEKEND_DATES.includes(format(selectedDate, "yyyy-MM-dd"));

  return (
    <Container className={styles.container}>
      <header className={styles.header}>
        <h1>웨이브파크 예약현황</h1>
      </header>

      <main>
        <div className={styles.dateSelector}>
          <Form.Label>날짜 선택:</Form.Label>
          <Form.Control
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => {
              const d = new Date(e.target.value);
              d.setHours(0, 0, 0, 0);
              setSelectedDate(d);
            }}
          />
        </div>
        <div className={styles.infoText}>남은자리/총자리수 입니다.</div>

        {loading && <div className={styles.loading}>불러오는 중…</div>}
        {error && (
          <Alert variant="danger" className={styles.error}>
            {error}
          </Alert>
        )}

        {!loading && (
          <Table className={styles.reservationTable} bordered hover>
            <thead>
              <tr>
                <th>시간</th>
                <th>세션</th>
                <th>좌</th>
                <th>우</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map((item) => (
                <tr key={`${item.시간}-${item.세션}`}>
                  <td>{item.시간}</td>
                  <td>
                    {item.세션}{" "}
                    {getSessionInfo(
                      item.시간,
                      item.세션.replace("나이트 ", ""),
                      isWeekend,
                      format(selectedDate, "yyyy-MM-dd")
                    )}
                  </td>
                  <td colSpan={item.시간.startsWith("18:00") ? 2 : 1}>
                    {item.시간.startsWith("18:00") ? item.night : item.left}
                  </td>
                  {!item.시간.startsWith("18:00") && <td>{item.right}</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </main>

      <footer className={styles.footer}>
        ※ 실제 예약은{" "}
        <a
          href="https://www.wavepark.co.kr/generalbooking"
          target="_blank"
          rel="noreferrer"
        >
          공식 사이트
        </a>
        에서 해주세요.
      </footer>
    </Container>
  );
}

const weekendSessionMap: { [key: string]: { [key: string]: string } } = {
  "2025-06-07": { 중급: "(M3f, M4f)", 초급: "(M3f, M4f)" },
  "2025-06-08": { 초급: "(M2, M3)", 중급: "(M2, M3)" },
  "2025-06-14": { 초급: "(M2, M3)", 중급: "(M2, M3)" },
  "2025-06-15": { 상급: "(T1, T2)", 초급: "(T1, T2)", 중급: "(T1, T2)" },
  "2025-06-21": { 중급: "(M2, M3, M4)", 초급: "(M2, M3, M4)" },
  "2025-06-22": { 초급: "(M1, M2)", 중급: "(M1, M2)" },
  "2025-06-28": { 중급: "(M3, M4L)", 초급: "(M3, M4L)" },
  "2025-06-29": { 상급: "(M4, T1)", 초급: "(M4, T1)", 중급: "(M4, T1)" },
};

function getSessionInfo(
  time: string,
  session: string,
  isWeekend: boolean,
  date: string
): string {
  const regularSessionMap: { [key: string]: string } = {
    "10:00-상급": "(M4, T1)",
    "11:00-초급": "(M1, M2)",
    "12:00-중급": "(M3, M4)",
    "13:00-초급": "(M1, M2)",
    "14:00-상급": "(M4)",
    "15:00-초급": "(M2, M3)",
    "16:00-상급": "(T1, T2)",
    "17:00-중급": "(M2, M3, M4)",
  };

  // 주말 세션 (10:00~17:00 및 18:00~22:00)
  if (isWeekend) {
    if (session === "알 수 없음" && time.startsWith("18:00")) {
      // 18:00 세션의 "알 수 없음"은 초급으로 매핑
      return weekendSessionMap[date]?.["초급"] || "";
    }
    return weekendSessionMap[date]?.[session] || "";
  }

  // 평일 세션 (10:00~17:00)
  return regularSessionMap[`${time}-${session}`] || "";
}
