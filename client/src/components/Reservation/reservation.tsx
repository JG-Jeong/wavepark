import React, { useState, useEffect } from "react";
import Calendar from "./calendar";

interface RowData {
  left: string;
  time: string;
  right: string;
}

const Reservation: React.FC<{}> = () => {
  const [pickDate, setPickDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Track the selected date

  useEffect(() => {
    fetch("https://localhost:8000/reservation/" + pickDate)
      .then((res) => res.json())
      .then((data) => {
        setPickDate(data.pickDate);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(pickDate);
  }, [pickDate]);

  const data: RowData[] = [
    {
      left: "10시 상급 좌/17",
      time: "10:00 ~ 11:00<br/>리프 상급",
      right: "10시 상급 우/17",
    },
    {
      left: "11시 강습",
      time: "11:00 ~ 12:00<br/>리프 초급",
      right: "11시 초급 우/25",
    },
    {
      left: "12시 중급 좌/25",
      time: "12:00 ~ 13:00<br/>리프 중급",
      right: "12시 중급 우/25",
    },
    {
      left: "13시 강습",
      time: "13:00 ~ 14:00<br/>리프 초급",
      right: "13시 초급 우/25",
    },
    {
      left: "14시 상급 좌/25",
      time: "14:00 ~ 15:00<br/>리프 상급",
      right: "14시 상급 우/17",
    },
    {
      left: "15시 초급 좌/25",
      time: "15:00 ~ 16:00<br/>리프 초급",
      right: "15시 초급 우/25",
    },
    {
      left: "16시 상급 좌/17",
      time: "16:00 ~ 17:00<br/>리프 상급",
      right: "16시 상급 우/17",
    },
    {
      left: "17시 중급 좌/25",
      time: "17:00 ~ 18:00<br/>리프 중급",
      right: "17시 중급 우/25",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Calendar pickDate={pickDate} setPickDate={setPickDate} />
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-center">좌</th>
            <th className="border p-2 text-center">시간</th>
            <th className="border p-2 text-center">우</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-2 text-center">{row.left}</td>
              <td
                className="border p-2 text-center"
                dangerouslySetInnerHTML={{ __html: row.time }}
              />
              <td className="border p-2 text-center">{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservation;
