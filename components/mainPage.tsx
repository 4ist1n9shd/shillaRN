import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="재훈" onPress={() => navigation.navigate('Jaehoon')} />
      <Button title="세훈" onPress={() => navigation.navigate('Sehoon')} />
      <Button title="문의게시판" onPress={() => navigation.navigate('Board')} />
      <Button title="수훈" onPress={() => navigation.navigate('Review')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // 버튼 간격 조정
  },
});

export default MainPage;