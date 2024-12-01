import React from "react";
import ReactDOM from "react-dom/client"; // React 18 이상에서 사용
import App from "./App"; // App 컴포넌트 임포트
import "./index.css"; // (선택) 스타일 파일 연결

// 'root'라는 id를 가진 DOM 요소를 찾음
const rootElement = document.getElementById("root");

if (rootElement) {
  // React 18 이상 방식으로 React DOM 생성 및 렌더링
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Check your public/index.html file.");
}
