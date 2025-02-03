import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const { date, room, price } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handlePayment = () => {
    if (!cardNumber || !phoneNumber || !name) {
      Alert.alert('오류', '모든 필드를 입력해야 합니다.');
      return;
    }

    navigation.navigate('PaymentCompletePage', {
      date,
      room,
      price,
      name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>결제 정보 입력</Text>

      <Text style={styles.label}>카드 번호</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="카드 번호를 입력하세요"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="전화번호를 입력하세요"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.paymentInfoContainer}>
        <Text style={styles.paymentInfo}>선택한 날짜: {date}</Text>
        <Text style={styles.paymentInfo}>객실: {room}</Text>
        <Text style={styles.paymentInfo}>총 금액: {price.toLocaleString()}원</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>결제 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  paymentInfoContainer: {
    marginVertical: 20,
  },
  paymentInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  paymentButton: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
