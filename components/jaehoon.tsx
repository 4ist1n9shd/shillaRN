import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Jaehoon = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [reservations, setReservations] = useState([]); 

  const roomData = [
    {
      name: '스탠다드디럭스',
      description: '모던한 콘셉트의 아늑한 공간으로 효율적인 구성이 돋보이는 객실입니다.',
      price: 260000,
      image: require('../assets/images/roomStandardDelux01.jpg'),
    },
    {
      name: '비즈니스디럭스',
      description: '비즈니스 고객을 위해 특별히 설계된 편안한 객실입니다.',
      price: 360000,
      image: require('../assets/images/roomStandardBusiness01.jpg'),
    },
    {
      name: '로열스위트',
      description: '모던한 분위기의 고급스러운 공간으로 다양한 편의시설을 제공합니다.',
      price: 2480000,
      image: require('../assets/images/roomSuiteRoyal01.jpg'),
    },
    {
      name: '신라스위트',
      description: '신라 브랜드만의 특별한 서비스와 경험을 제공합니다.',
      price: 2890000,
      image: require('../assets/images/roomSuiteShilla01.jpg'),
    },
    {
      name: '프레지덴셜스위트',
      description: '서울신라호텔 최고의 객실로 전세계 VIP를 위한 전용 공간입니다.',
      price: 10000000,
      image: require('../assets/images/roomSuitePresidential01.jpg'),
    },
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedRoom) {
      Alert.alert('오류', '날짜와 객실을 모두 선택해주세요.');
    } else {
      navigation.navigate('PaymentPreparation', {
        date: selectedDate,
        room: selectedRoom.name,
        price: selectedRoom.price,
      });
    }
  };

  const loadAllReservations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const reservationKeys = keys.filter((key) => key.startsWith('reservation_')); // 고유 키 필터링
      const reservationData = await AsyncStorage.multiGet(reservationKeys); // 모든 예약 데이터 가져오기

      const parsedReservations = reservationData.map(([key, value]) => JSON.parse(value));
      setReservations(parsedReservations); // 상태에 저장
      console.log('✅ 모든 예약 내역 불러오기 성공:', parsedReservations);
    } catch (error) {
      console.error('❌ 예약 정보 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    console.log('✅ 예약 페이지에 도달했습니다.');
    loadAllReservations(); // 예약 페이지 진입 시 모든 예약 내역 불러오기
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>예약 페이지</Text>

      {/* 날짜 선택 */}
      <Text style={styles.label}>날짜 선택:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsDateModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedDate || '날짜를 선택하세요'}
        </Text>
      </TouchableOpacity>

      {/* 객실 선택 */}
      <Text style={styles.label}>객실 선택:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsRoomModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {selectedRoom ? selectedRoom.name : '객실을 선택하세요'}
        </Text>
      </TouchableOpacity>

      {/* 날짜 선택 모달 */}
      <Modal visible={isDateModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>날짜 선택</Text>
            <FlatList
              data={generateDates()}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dateItem}
                  onPress={() => {
                    setSelectedDate(item);
                    setIsDateModalVisible(false);
                  }}
                >
                  <Text style={styles.dateText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsDateModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 객실 선택 모달 */}
      <Modal visible={isRoomModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>객실 선택</Text>
            <FlatList
              data={roomData}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.roomCard}
                  onPress={() => {
                    setSelectedRoom(item);
                    setIsRoomModalVisible(false);
                  }}
                >
                  <Image source={item.image} style={styles.roomImage} />
                  <Text style={styles.roomName}>{item.name}</Text>
                  <Text style={styles.roomDescription}>{item.description}</Text>
                  <Text style={styles.roomPrice}>
                    가격: {item.price.toLocaleString()}원
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsRoomModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 다음 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>다음</Text>
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
  },
  inputText: {
    color: '#333',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  dateItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  roomCard: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  roomImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  roomDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  roomPrice: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#7A6C64',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Jaehoon;
