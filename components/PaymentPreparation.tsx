import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const PaymentPreparation = ({ route, navigation }) => {
  const { date, room, price } = route.params;

  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);

  const handlePayment = () => {
    if (!agreePrivacy || !agreeThirdParty) {
      Alert.alert('오류', '모든 약관에 동의해야 결제를 진행할 수 있습니다.');
      return;
    }

    navigation.navigate('PaymentPage', {
      date,
      room,
      price,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>결제 준비</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>선택한 날짜:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>선택한 객실:</Text>
        <Text style={styles.value}>{room}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>총 결제 금액:</Text>
        <Text style={styles.value}>{price.toLocaleString()}원</Text>
      </View>

      {/* 필수적인 개인정보 수집 이용 동의 */}
      <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreePrivacy(!agreePrivacy)}
        >
          <View style={agreePrivacy ? styles.checkedBox : styles.uncheckedBox} />
          <Text style={styles.checkboxLabel}>필수적인 개인정보의 수집ㆍ이용에 관한 사항</Text>
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          신라호텔 객실예약과 관련하여 귀사가 아래와 같이 본인의 개인정보를 수집 및 이용하는데 동의합니다.
        </Text>
        <Text style={styles.agreementDetails}>
          ① 수집 이용 항목 | 성명(국문·영문), 성별, 지역(여권기준), 이메일, 연락처(휴대전화·자택전화), 구매 및 예약 내역, 투숙기간, 결제정보(카드종류, 카드번호, 유효기간)
          {'\n'}② 수집 이용 목적 | 호텔 예약 및 고객 응대
          {'\n'}③ 보유 이용 기간 | 예약일 후 1년
        </Text>
        
      </View>

      {/* 개인정보 제3자 제공 동의 */}
      <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreeThirdParty(!agreeThirdParty)}
        >
          <View style={agreeThirdParty ? styles.checkedBox : styles.uncheckedBox} />
          <Text style={styles.checkboxLabel}>개인정보 제3자 제공에 대한 동의</Text>
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          신라호텔 객실예약과 관련하여 귀사가 아래와 같이 본인의 개인정보를 제3자에게 제공하는데 동의합니다.
        </Text>
        <Text style={styles.agreementDetails}>
          ① 제공받는 자 | 신라에이치엠㈜
          {'\n'}② 제공 목적 | 호텔 예약 및 고객 응대
          {'\n'}③ 제공 항목 | 성명(국문·영문), 지역(여권기준), 이메일, 연락처(휴대전화·자택전화), 구매 및 예약 내역, 투숙기간, 결제정보(카드종류, 카드번호, 유효기간)
          {'\n'}④ 제공 기간 | 예약일 후 1년간
        </Text>
        
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>결제하기</Text>
      </TouchableOpacity>
    </ScrollView>
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
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  agreementContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: '#7A6C64',
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  agreementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  agreementDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notice: {
    fontSize: 12,
    color: '#999',
  },
  paymentButton: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentPreparation;
