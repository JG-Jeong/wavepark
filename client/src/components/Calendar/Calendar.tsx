import React from "react";
import { Card, Table } from "react-bootstrap";
import styles from "../InfoSection/InfoSection.module.css";

const Calendar = () => {
  return (
    <Card className={`mb-3 ${styles.scheduleCard}`}>
      <Card.Body>
        <Card.Title className={styles.tempTitle} style={{ fontSize: "40px" }}>
          {" "}
          6월
        </Card.Title>
        <Table className={styles.cTable}>
          <thead>
            <tr>
              <th style={{ width: "14.28%", color: "red" }}>정규세션</th>
              <th
                style={{
                  width: "14.28%",
                  fontSize: "24px",
                  backgroundColor: "#ffa500",
                }}
                colSpan={5}
              >
                펀딩세션, 30% 이상시 펀딩 오픈!
              </th>
              <th style={{ width: "14.28%", color: "blue" }}>정규세션</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th style={{ width: "14.28%", color: "red" }}>일</th>
              <th style={{ width: "14.28%" }}>월</th>
              <th style={{ width: "14.28%" }}>화</th>
              <th style={{ width: "14.28%" }}>수</th>
              <th style={{ width: "14.28%" }}>목</th>
              <th style={{ width: "14.28%" }}>금</th>
              <th style={{ width: "14.28%", color: "blue" }}>토</th>
            </tr>
          </thead>
          <tbody>
            {/* Week 1 */}
            <tr>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>1</div>
                <div>-</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>2</div>
                <div>-</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>3</div>
                <div>선거일</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>4</div>
                <div>-</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>5</div>
                <div>-</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>6</div>
                <div>상급세션</div>
                <div>M4,T1</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "blue" }}>7</div>
                <div>중급세션</div>
                <div>M3(f),M4(f)</div>
              </td>
            </tr>

            {/* Week 2 */}
            <tr>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>8</div>
                <div>초급세션</div>
                <div>M2,M3</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>상급세션</div>
                <div>T1,T2</div>
                <div>40 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>10</div>
                <div>중급세션</div>
                <div>M2,M3,M4</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>11</div>
                <div>초급세션</div>
                <div>M1,M2,M3</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>12</div>
                <div>중급세션</div>
                <div>M3(f),M4(f)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>13</div>
                <div>상급세션</div>
                <div>M4,T1</div>
                <div>40CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "blue" }}>14</div>
                <div>초급세션</div>
                <div>M2,M3</div>
              </td>
            </tr>

            {/* Week 3 */}
            <tr>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>15</div>
                <div>상급세션</div>
                <div>T1,T2</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>16</div>
                <div>중급세션</div>
                <div>M2,M3,M4</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>17</div>
                <div>중급세션</div>
                <div>M2(e),M3(e)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>18</div>
                <div>중급세션</div>
                <div>M3,M4</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>19</div>
                <div>상급세션</div>
                <div>T1, T2</div>
                <div>40 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>20</div>
                <div>초급세션</div>
                <div>M1,M2</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "blue" }}>21</div>
                <div>중급세션</div>
                <div>M2,M3,M4</div>
              </td>
            </tr>

            {/* Week 4 */}
            <tr>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>22</div>
                <div>초급세션</div>
                <div>M1,M2</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>23</div>
                <div>상급세션</div>
                <div>T1,T2</div>
                <div>40 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>24</div>
                <div>중급세션</div>
                <div>M3,M4</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>25</div>
                <div>초급세션</div>
                <div>M1,M2,M3</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>26</div>
                <div>상급세션</div>
                <div>M4,T1</div>
                <div>40 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>27</div>
                <div>중급세션</div>
                <div>M2,M3,M4(e)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "blue" }}>28</div>
                <div>중급세션</div>
                <div>M3,M4(L)</div>
              </td>
            </tr>

            {/* Week 5 */}
            <tr>
              <td style={{ width: "14.28%" }}>
                <div style={{ color: "red" }}>29</div>
                <div>초급세션</div>
                <div>M4,T1</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>30</div>
                <div>중급세션</div>
                <div>M2,M3,M4</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }} colSpan={5}></td>
            </tr>

            {/* Week 1 of July */}
            <tr>
              <td style={{ width: "14.28%" }}></td>{" "}
              <td style={{ width: "14.28%" }}></td>
              <td style={{ width: "14.28%" }}>
                <div>1</div>
                <div>중급세션</div>
                <div>M3,M4(L)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>2</div>
                <div>중급세션</div>
                <div>M3,M4,T1(e)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>3</div>
                <div>초급세션</div>
                <div>M1,M2</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}>
                <div>4</div>
                <div>중급세션</div>
                <div>M2,M3,M4(L)</div>
                <div>60 CAPA</div>
              </td>
              <td style={{ width: "14.28%" }}></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
