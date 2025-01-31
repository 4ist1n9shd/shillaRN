import React, { createContext, useState } from 'react';

// AuthContext 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로그인 함수
  const login = (username, password) => {
    if (username === 'testuser' && password === '1234') {
      setIsLoggedIn(true); // 로그인 성공
      return true;
    }
    return false; // 로그인 실패
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};