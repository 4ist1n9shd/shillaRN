import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';

function Suhoon({ navigation }) {
  const [nowId, setNowId] = useState(4);
  const [datas, setDatas] = useState([
    { id: '1', title: '역시 고급지고 깔끔해요', content: '내용1' },
    { id: '2', title: '완전 대만족', content: '내용2' },
    { id: '3', title: '이부진 짱짱', content: '내용3' }
  ]);

  const writeGo = () => {
    navigation.navigate('ReviewWrite', { setDatas, nowId, setNowId });
  };

  const detailGo = (data) => {
    navigation.navigate('ReviewDetail', { data, deleteReg, listModifyReg });
  };

  const deleteReg = (delId) => {
    setDatas((prevDatas) => prevDatas.filter((item) => item.id != delId));
  };

  const listModifyReg = (newItem) => {
    setDatas((prevDatas) => prevDatas.map((item) => (item.id == newItem.id ? newItem : item)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>후기 게시판</Text>

      <FlatList style={styles.listWrap}
        data={datas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => detailGo(item)}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.writeButton} onPress={writeGo}>
        <Text style={styles.writeButtonText}>글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F4',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  listWrap: {
    backgroundColor: '#F6F6F6', // POINT BACKGROUND 색상
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 10,
  },
  writeButton: {
    backgroundColor: '#7A6C64',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  writeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //listItem: {
  //  backgroundColor: '#fff',
  //  padding: 15,
  //  borderRadius: 8,
  //  marginBottom: 10,
  //  shadowColor: '#000',
  //  shadowOffset: { width: 0, height: 2 },
  //  shadowOpacity: 0.1,
  //  shadowRadius: 4,
  //  elevation: 3,
  //},
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default Suhoon;
