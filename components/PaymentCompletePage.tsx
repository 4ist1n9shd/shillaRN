import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaymentCompletePage = ({ route, navigation }) => {
  const { date, room, price, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>예약이 완료되었습니다!</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>예약자 이름:</Text>
        <Text style={styles.infoValue}>{name}</Text>

        <Text style={styles.infoLabel}>예약 날짜:</Text>
        <Text style={styles.infoValue}>{date}</Text>

        <Text style={styles.infoLabel}>객실:</Text>
        <Text style={styles.infoValue}>{room}</Text>

        <Text style={styles.infoLabel}>총 결제 금액:</Text>
        <Text style={styles.infoValue}>{price.toLocaleString()}원</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainPage')}
      >
        <Text style={styles.buttonText}>메인으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F4',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    width: '100%',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentCompletePage;