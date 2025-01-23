import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Aram = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>환영합니다 아람님</Text>
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

export default Aram;