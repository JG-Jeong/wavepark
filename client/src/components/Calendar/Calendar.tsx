import React from "react";
import { Card, Table } from "react-bootstrap";
import styles from "./Calendar.module.css";

const Calendar = () => {
  return (
    <Card className={`mb-3 ${styles.scheduleCard}`}>
      <Card.Body style={{ padding: "8px" }}>
        <Card.Title className={styles.tempTitle} style={{ fontSize: "20px" }}>
          6월
        </Card.Title>
        <div style={{ overflowX: "auto" }}>
          <Table className={styles.cTable} style={{ fontSize: "10px" }}>
            <thead>
              <tr>
                <th style={{ width: "12%", color: "red", padding: "3px" }}>
                  정규세션
                </th>
                <th
                  style={{
                    width: "60%",
                    fontSize: "12px",
                    backgroundColor: "#ffa500",
                    padding: "3px",
                  }}
                  colSpan={5}
                >
                  펀딩세션, 30% 이상시 펀딩 오픈!
                </th>
                <th style={{ width: "12%", color: "blue", padding: "3px" }}>
                  정규세션
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th style={{ width: "12%", color: "red", padding: "3px" }}>
                  일
                </th>
                <th style={{ width: "12%", padding: "3px" }}>월</th>
                <th style={{ width: "12%", padding: "3px" }}>화</th>
                <th style={{ width: "12%", padding: "3px" }}>수</th>
                <th style={{ width: "12%", padding: "3px" }}>목</th>
                <th style={{ width: "12%", padding: "3px" }}>금</th>
                <th style={{ width: "12%", color: "blue", padding: "3px" }}>
                  토
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Week 1 */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>1</div>
                  <div>-</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>2</div>
                  <div>-</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>3</div>
                  <div>선거일</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>4</div>
                  <div>-</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>5</div>
                  <div>-</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>6</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>M4,T1</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "blue" }}>7</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M3f,M4f</div>
                </td>
              </tr>
              {/* Week 2 */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>8</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "9px" }}>M2,M3</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>9</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>T1,T2</div>
                  <div style={{ fontSize: "9px" }}>40CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>10</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>11</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "7px" }}>M1,M2,M3</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>12</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M3f,M4f</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>13</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>M4,T1</div>
                  <div style={{ fontSize: "9px" }}>40CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "blue" }}>14</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "9px" }}>M2,M3</div>
                </td>
              </tr>
              {/* Week 3 */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>15</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>T1,T2</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>16</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>17</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2e,M3e</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>18</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "9px" }}>M3,M4</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>19</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>T1,T2</div>
                  <div style={{ fontSize: "9px" }}>40CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>20</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "9px" }}>M1,M2</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "blue" }}>21</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4</div>
                </td>
              </tr>
              {/* Week 4 */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>22</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "9px" }}>M1,M2</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>23</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>T1,T2</div>
                  <div style={{ fontSize: "9px" }}>40CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>24</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "9px" }}>M3,M4</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>25</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "7px" }}>M1,M2,M3</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>26</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>M4,T1</div>
                  <div style={{ fontSize: "9px" }}>40CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>27</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4e</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "blue" }}>28</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "9px" }}>M3,M4L</div>
                </td>
              </tr>
              {/* Week 5 */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div style={{ color: "red" }}>29</div>
                  <div>상급세션</div>
                  <div style={{ fontSize: "9px" }}>M4,T1</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>30</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "60%", padding: "3px" }} colSpan={5}></td>
              </tr>
              {/* Week 1 of July */}
              <tr>
                <td style={{ width: "12%", padding: "3px" }}></td>
                <td style={{ width: "12%", padding: "3px" }}></td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>1</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "9px" }}>M3,M4L</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>2</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M3,M4,T1e</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>3</div>
                  <div>초급세션</div>
                  <div style={{ fontSize: "9px" }}>M1,M2</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}>
                  <div>4</div>
                  <div>중급세션</div>
                  <div style={{ fontSize: "7px" }}>M2,M3,M4L</div>
                  <div style={{ fontSize: "9px" }}>60CAPA</div>
                </td>
                <td style={{ width: "12%", padding: "3px" }}></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
