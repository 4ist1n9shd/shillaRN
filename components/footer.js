import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

// 🔹 푸터 데이터 (필요한 정보만 유지)
const footerTerms = [
  { title: '이용약관', link: '#' },
  { title: '개인정보 처리방침', link: '#' },
  { title: '사업자정보확인', link: '#' },
];

const footerInfo = [
  '법인명: (주) 호텔신라',
  '대표자: 이부진 | 사업자 등록번호: 203.81.43363',
  '통신판매신고번호: 중구00272호',
  '호스팅서비스제공자: 삼성SDS(주)',
  '객실예약: shilla.reserve@samsung.com',
  '주소: 서울특별시 중구 동호로 249',
  'TEL: 02-2233-3131 | FAX: 02-2230-3769',
];

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* 🔹 이용약관, 개인정보 처리방침, 사업자정보확인 */}
      <View style={styles.footerTerms}>
        {footerTerms.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(item.link)}>
            <Text style={styles.footerTermText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 호텔 정보 */}
      <View style={styles.footerInfo}>
        {footerInfo.map((info, index) => (
          <Text key={index} style={styles.footerText}>{info}</Text>
        ))}
      </View>

      <Text style={styles.footerCopy}>© HOTEL SHILLA CO.,LTD All Rights Reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { padding: 20, backgroundColor: '#333', alignItems: 'center', marginTop: 20 },
  footerTerms: { flexDirection: 'row', marginBottom: 10 },
  footerTermText: { color: '#bbb', marginHorizontal: 10 },
  footerInfo: { alignItems: 'center', marginBottom: 10 },
  footerText: { color: '#ddd', fontSize: 12 },
  footerCopy: { color: '#bbb', fontSize: 12, marginTop: 10 },
});

export default Footer;