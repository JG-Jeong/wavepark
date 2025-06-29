/* 기상청 초단기 실황 API - 흐림/맑음/비/눈 상태 가져오기 */
/* 시흥시 정왕동 위도 경도 격좌표: x=56, y=121 */

export const fetchWeatherData = async (): Promise<string> => {
  const serviceKey = process.env.REACT_APP_WEATHER_API_KEY;
  const now = new Date();

  const pad = (n: number) => String(n).padStart(2, "0");

  const base_date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}`;
  console.log(now);
  const base_time = getNearestTime(now);
  const targetFcstTime = getFcstTime(now); //현재 시간의 다음 정시
  console.log("base_tiem: ", base_time, "target: " + targetFcstTime);

  //getUltraSrtFcst: 초단기예보조회
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&base_date=${base_date}&base_time=${base_time}&nx=56&ny=121&dataType=JSON&numOfRows=100`;
  try {
    const response = await fetch(url);
    const json = await response.json();

    const items = json.response.body.items.item;

    // SKY와 PTY 항목 찾기
    const sky = items.find(
      (i: any) => i.category === "SKY" && i.fcstTime === targetFcstTime
    )?.fcstValue;
    const pty = items.find(
      (i: any) => i.category === "PTY" && i.fcstTime === targetFcstTime
    )?.fcstValue;

    console.log("sky::", sky, " pty::", pty);
    return parseWeatherStatus(sky, pty);
  } catch (e) {
    console.log("API호출 에러: ", e);
    return "호출실패";
  }
};

//가까운 시간대로 - Base_time: 매 시간 30분에 생성
const getNearestTime = (now: Date): string => {
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (minute < 30) {
    const hourStr = String(hour - 1).padStart(2, "0");
    console.log("시간추출: ", `${hourStr}30`);
    return `${hourStr}30`.toString(); //30분 이전에는 현 시간대의 정보-> 한시간 전 시간대로 정보 추출
  } else {
    const hourStr = String(hour).padStart(2, "0");
    console.log("시간추출: ", `${hourStr}30`);
    return `${hourStr}30`.toString();
  }
};

//get FcstTime
const getFcstTime = (now: Date): string => {
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (minute < 30) {
    return `${hour}00`.toString();
  } else {
    return `${hour + 1}00`.toString();
  }
};

const parseWeatherStatus = (sky: string, pty: string): string => {
  //(초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  if (pty !== "0") {
    return (
      {
        "1": "비",
        "2": "비", //비/눈
        "3": "눈",
        "5": "비", //빗방울
        "6": "비", //빗방울눈날림
        "7": "눈", //눈날림
      }[pty] || "강수없음" //값 못불러오는 경우 강수없음으로 표시됨(-, null, 0값은 ‘강수없음')
    );
  }
  return (
    //맑음(1), 구름많음(3), 흐림(4)
    {
      "1": "맑음",
      "3": "구름많음",
      "4": "흐림",
    }[sky] || "알수없음"
  );
};

export default fetchWeatherData;
