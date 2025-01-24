import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Sehoon = () => {
  // 하드코딩된 아이디와 비밀번호
  const VALID_CREDENTIALS = {
    username: 'testuser',
    password: '1234',
  };

  const [inputUsername, setInputUsername] = useState(''); // 입력된 아이디
  const [inputPassword, setInputPassword] = useState(''); // 입력된 비밀번호
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 로그인 처리 함수
  const handleLogin = () => {
    if (inputUsername.trim() === '' || inputPassword.trim() === '') {
      Alert.alert('Error', '아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    if (
      inputUsername === VALID_CREDENTIALS.username &&
      inputPassword === VALID_CREDENTIALS.password
    ) {
      setIsLoggedIn(true); // 로그인 성공
      Alert.alert('Success', '로그인에 성공했습니다!');
    } else {
      Alert.alert('Error', '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태 초기화
    setInputUsername(''); // 입력된 아이디 초기화
    setInputPassword(''); // 입력된 비밀번호 초기화
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.text}>환영합니다, {inputUsername}님!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.text}>로그인</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력하세요"
            value={inputUsername}
            onChangeText={(text) => setInputUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true} // 비밀번호 입력 숨김 처리
            value={inputPassword}
            onChangeText={(text) => setInputPassword(text)}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loggedInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Sehoon;