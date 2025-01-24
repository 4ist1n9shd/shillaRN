import React, { useState } from 'react';

// Props 타입 정의
interface LoginPageProps {
  onLogin: () => void;
}

interface HomePageProps {
  onLogout: () => void;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태를 true로 변경
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div style={styles.loginPage}>
      <h1 style={styles.title}>Login</h1>
      <button onClick={onLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  return (
    <div style={styles.homePage}>
      <h1 style={styles.title}>Welcome to the Home Page</h1>
      <button onClick={onLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: { textAlign: 'center', marginTop: '50px' },
  loginPage: { padding: '20px', border: '1px solid #ccc', display: 'inline-block' },
  homePage: { padding: '20px', border: '1px solid #ccc', display: 'inline-block' },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default App;