import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Jaehoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>환영합니다 재훈님</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Jaehoon;