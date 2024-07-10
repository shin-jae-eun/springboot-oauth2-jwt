import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));

  const config = {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  };

  const handleLogin = (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);
  };

  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
    setUser(null); // 로그아웃 후 사용자 정보 초기화
  };

  const getUser = async () => {
    try {
      let res = await Axios.get("http://1.248.220.168:3000/user", config);
      setUser(res.data); // 서버에서 받은 사용자 데이터 설정
    } catch (error) {
      console.error("유저 정보 가져오기 실패:", error);
    }
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
      {jwtToken ? (
        <div>
          <h1>/user : {user ? user.username : "사용자 정보 없음"}</h1>
          <button onClick={getUser}>유저정보 가져오기</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}

export default App;
