import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AuthContext } from '../AuthContext';
import Footer from './footer'; // 🔹 푸터 추가

const { width } = Dimensions.get('window'); // 화면 너비 가져오기

const BUTTONS = [
  { title: '예약하기', navigateTo: 'Reserve' },
  { title: '문의게시판', navigateTo: 'boardList' },
  { title: '수훈', navigateTo: 'Review' },
];

// 🔹 3장의 로컬 이미지 배열 (1920x1280 크기로 맞춤)
const images = [
  require('../assets/images/main-slide-1.jpg'),
  require('../assets/images/main-slide-2.jpg'),
  require('../assets/images/main-slide-3.jpg'),
];

const MainPage = ({ navigation, route }) => {
  const { logout } = useContext(AuthContext);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 기존 신라호텔 위치 (초기값)
  const defaultRegion = {
    latitude: 37.557229,
    longitude: 127.007811,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // 🔹 route에서 region을 받아오거나, 기본값 사용 (결제 완료 후에도 유지)
  const [region, setRegion] = useState(route.params?.region || defaultRegion);

  // 🔹 3초마다 자동 스와이프 (한 방향으로만 이동)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToOffset({ offset: nextIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ScrollView style={styles.container}>
      {/* 로고 (헤더 역할) */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* 🔹 네비게이션 바 */}
      <View style={styles.navBar}>
        {BUTTONS.map((button) => (
          <TouchableOpacity
            key={button.title}
            style={styles.navButton}
            onPress={() => navigation.navigate(button.navigateTo)}
          >
            <Text style={styles.navButtonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.navButton} onPress={logout}>
          <Text style={styles.navButtonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 자동 스와이프 및 손가락 스와이프 가능 */}
      <View style={styles.swiperContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Image source={item} style={styles.swiperImage} />}
          snapToOffsets={images.map((_, index) => index * width)}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
        />
      </View>

      {/* 신라호텔 위치 텍스트 */}
      <Text style={styles.mapTitle}>신라호텔 위치</Text>

      {/* 지도 */}
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        <Marker coordinate={region} title="신라호텔" description="서울특별시 중구 동호로 249" />
      </MapView>

      {/* 🔹 푸터 추가 */}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { width: '100%', alignItems: 'center', paddingVertical: 15, backgroundColor: '#f8f8f8' },
  logo: { width: 200, height: 80, resizeMode: 'contain' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#333', paddingVertical: 10 },
  navButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  swiperContainer: { width: '100%', height: 200, marginBottom: 20 },
  swiperImage: { width: width, height: 200, resizeMode: 'cover' },
  mapTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  map: { width: '100%', height: 300, marginTop: 10 },
});

export default MainPage;