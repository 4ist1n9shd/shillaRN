import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationListPage = ({ navigation }) => {
  const [reservations, setReservations] = useState([]); // 예약 내역 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // AsyncStorage에서 모든 예약 데이터를 불러오기
  const loadReservations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // 모든 키 가져오기
      const reservationKeys = keys.filter((key) => key.startsWith('reservation_')); // 예약 키만 필터링
      const reservationData = await AsyncStorage.multiGet(reservationKeys); // 예약 데이터 가져오기

      const parsedReservations = reservationData.map(([key, value]) => JSON.parse(value)); // 데이터 파싱
      setReservations(parsedReservations); // 상태에 저장
      console.log('✅ 모든 예약 데이터 로드 성공:', parsedReservations);
    } catch (error) {
      console.error('❌ 예약 데이터 로드 오류:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    loadReservations(); // 컴포넌트 마운트 시 데이터 불러오기
  }, []);

  // 예약 데이터가 없는 경우 보여줄 메시지
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>로딩 중...</Text>
      </View>
    );
  }

  if (reservations.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>저장된 예약 내역이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>예약 내역 확인</Text>

      {/* 예약 내역 리스트 */}
      <FlatList
        data={reservations}
        keyExtractor={(item, index) => index.toString()} // 고유 키 생성
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>예약자 이름: {item.name}</Text>
            <Text style={styles.cardText}>예약 날짜: {item.date}</Text>
            <Text style={styles.cardText}>객실 이름: {item.room}</Text>
          </View>
        )}
      />

      {/* 메인으로 돌아가기 버튼 */}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReservationListPage;
