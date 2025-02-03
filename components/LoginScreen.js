import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';

const LoginScreen = () => {
  const { login } = useContext(AuthContext); // AuthContext에서 로그인 함수 가져오기
  console.log('Login function:', login); // 디버깅용
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const success = login(username, password); // 로그인 시도
    if (success) {
      Alert.alert('Success', '로그인 성공!');
    } else {
      Alert.alert('Error', '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
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

export default LoginScreen;