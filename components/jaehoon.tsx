import React, { useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import WebView from 'react-native-webview';

const Jaehoon = ({ navigation }) => {
  const webViewRef = useRef(null);

  // WebView로부터 데이터를 수신
  const handleMessage = (event) => {
    const { date, room, price } = JSON.parse(event.nativeEvent.data);
    if (date && room && price) {
      // 다음 페이지로 데이터 전달
      navigation.navigate('PaymentPreparation', { date, room, price });
    } else {
      Alert.alert('오류', '날짜와 객실 정보를 확인해주세요.');
    }
  };

  // 웹뷰 초기 스크립트 (injectJavaScript 사용 가능)
  const injectedJavaScript = `
    (function() {
      const sendDataToApp = () => {
        const selectedDate = localStorage.getItem('selectedDate');
        const selectedRoom = localStorage.getItem('selectedRoom');
        const price = localStorage.getItem('price');
        if (selectedDate && selectedRoom && price) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ date: selectedDate, room: selectedRoom, price: price })
          );
        } else {
          alert('날짜와 객실을 선택해주세요.');
        }
      };
      document.getElementById('nextButton').addEventListener('click', sendDataToApp);
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://your-web-page-url.com/booking' }} // 예약 페이지 URL
        style={styles.webview}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Jaehoon;
