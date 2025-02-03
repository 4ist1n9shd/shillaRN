import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AuthContext } from '../AuthContext';

const BUTTONS = [
  { title: '재훈', navigateTo: 'Jaehoon' },
  { title: '문의게시판', navigateTo: 'boardList' },
  { title: '수훈', navigateTo: 'Review' },
];

const MainPage = ({ navigation }) => {
  const { logout } = useContext(AuthContext); // 로그아웃 함수 가져오기

  const [region, setRegion] = useState({
    latitude: 37.557229, // 신라호텔 위도
    longitude: 127.007811, // 신라호텔 경도
    latitudeDelta: 0.01, // 줌 레벨
    longitudeDelta: 0.01, // 줌 레벨
  });

  const handleZoom = (zoomIn) => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: zoomIn ? prev.latitudeDelta / 2 : prev.latitudeDelta * 2,
      longitudeDelta: zoomIn ? prev.longitudeDelta / 2 : prev.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      {/* 환영 문구 */}
      <Text style={styles.welcomeText}>testuser님 반갑습니다.</Text>

      {/* 버튼 그룹 */}
      <View style={styles.buttonContainer}>
        {BUTTONS.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            onPress={() => navigation.navigate(button.navigateTo)}
          />
        ))}
        <Button title="로그아웃" onPress={logout} />
      </View>

      {/* 신라호텔 위치 텍스트 */}
      <Text style={styles.mapTitle}>신라호텔 위치</Text>

      {/* 지도 */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={{ latitude: 37.557229, longitude: 127.007811 }}
          title="신라호텔"
          description="서울특별시 중구 동호로 249"
        />
      </MapView>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    gap: 10,
    marginBottom: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
    marginTop: 10,
  },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    marginTop: 10,
  },
});

export default MainPage;