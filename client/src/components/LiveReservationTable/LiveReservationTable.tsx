// src/components/LiveReservationTable.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ReservationRow {
  time: string;
  totalCapa: string;
  course: string;
  reefLeft: string;
  reefRight: string;
  bayLeft: string;
  bayRight: string;
}

const LiveReservationTable: React.FC = () => {
  const [data, setData] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservationData = async () => {
    try {
      setLoading(true);

      // 실제 Wavepark API가 로그인 세션 필요하므로 백엔드 프록시로 우회하거나 수동 테스트 필요
      const response = await axios.get<ReservationRow[]>('/api/reservation');

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('예약 데이터를 불러올 수 없습니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationData();
    const interval = setInterval(fetchReservationData, 10 * 60 * 1000); // 10분마다
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">실시간 예약현황</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>시간</th>
            <th>총 CAPA</th>
            <th>코스</th>
            <th>리프좌</th>
            <th>리프우</th>
            <th>베이좌</th>
            <th>베이우</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{row.time}</td>
              <td>{row.totalCapa}</td>
              <td>{row.course}</td>
              <td>{row.reefLeft}</td>
              <td>{row.reefRight}</td>
              <td>{row.bayLeft}</td>
              <td>{row.bayRight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveReservationTable;
