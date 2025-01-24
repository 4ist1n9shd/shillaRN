import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';


function boardList({ navigation }) {

    const [nowId, setNowId] = useState(4)
    const [datas, setDatas] = useState([
        { id: 1, title: 'Hi~I am Lisa', content: 'hi~ I am Lisa, I want many towels' },
        { id: 2, title: '저는 신라호텔의 VIP입니다', content: 'VIP의 혜택이 어떤 것이 있는지 궁금합니다' },
        { id: 3, title: '문의할게요', content: '욕조가 있는 방인지 궁금해요' }
    ])

    const writeGo = () => {

        navigation.navigate('boardWrite', { setDatas, nowId, setNowId });
    }

    const detailGo = (data) => {

        navigation.navigate('boardDetail', { data, deleteReg, listModifyReg });
    }

    const deleteReg = (delId) => {
        setDatas((prevDatas) => prevDatas.filter((item) => item.id != delId))
    }

    const listModifyReg = (newItem) => {
        setDatas((prevDatas) => prevDatas.map((item) => item.id == newItem.id ? newItem : item))
    }

    return (
        <View style={styles.pageWrap}>

            <Text style={styles.listTitle}>문의 목록</Text>

            <FlatList style={styles.listWrap}
                data={datas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={
                    ({ item }) => (
                        <TouchableOpacity onPress={() => detailGo(item)} style={styles.listItem}>
                            <Text style={styles.listText}>{item.title}</Text>
                        </TouchableOpacity>
                    )

                }

            />


            <TouchableOpacity style={styles.btn} onPress={writeGo}>

                <Text style={styles.btnText}>글쓰기</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    pageWrap: {
        flex: 1,
        backgroundColor: '#FAF8F4', // MAIN 색상
        padding: 20,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // FONT 색상
        textAlign: 'center',
        marginBottom: 20,
    },
    listWrap: {
        backgroundColor: '#F6F6F6', // POINT BACKGROUND 색상
        fontWeight: 'bold',
        borderRadius: 10,
        padding: 10,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    listText: {
        fontSize: 18,
        fontWeight:500,
        color: '#333', // FONT 색상
    },
    btn: {
        backgroundColor: '#7A6C64', // SUB 색상
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    btnText: {
        color: '#FAF8F4', // MAIN 색상
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default boardList;