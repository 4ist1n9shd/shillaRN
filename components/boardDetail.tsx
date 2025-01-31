import React, {useState} from 'react';
import { Alert, Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function boardDetail({ route  , navigation}) {

    const {data, deleteReg, listModifyReg} = route.params;

    const [detailData, setDetailData] = useState(data);

    const delGo = ()=>{
        Alert.alert('글 삭제','정말로 삭제하시겠습니까?', [
            {
                text:'취소',
                style:'cancel'
            },

            {
                text:'삭제',
                style:'destructive',
                onPress:()=>{
                    deleteReg(data.id)
                    navigation.goBack()
                }
            }

        ])
    }

    const modifyGo = ()=>{
        navigation.navigate('boardModify',{data, modifyReg})
    }

    const modifyReg = (updateItem) => {
        setDetailData(updateItem); // 수정된 데이터로 업데이트
        listModifyReg(updateItem); // 부모 컴포넌트의 listModifyReg 호출
    };

    return (
        <View>
           <Text style={styles.detailTitle}>상세 보기</Text>
            <Text style={styles.detailttt}>제목</Text>
            <Text style={styles.detailText}>{detailData.title}</Text>
            <Text style={styles.detailttt}>내용</Text>
            <Text style={styles.detailText}>{detailData.content}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.modifyButton]} onPress={modifyGo}>
                    <Text style={styles.buttonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={delGo}>
                    <Text style={styles.buttonText}>삭제</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageWrap: {
        flex: 1,
        backgroundColor: '#FAF8F4', // MAIN 색상
        padding: 20,
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 50,
        marginTop:30,
    },
    detailttt:{
        fontSize: 18,
        fontWeight:'bold',
        marginBottom:10,
        marginLeft:10,
    },
    detailText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        marginLeft:20,
    },
    buttonContainer: {
        flexDirection: 'row', // 버튼을 가로로 배치
        justifyContent: 'space-between', // 버튼 간 공간을 균등 배치
        marginTop: 20,
    },
    button: {
        flex: 1, // 버튼들이 같은 비율로 공간을 차지하게 함
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5, // 버튼 간 간격을 두기 위해 사용
    },
    modifyButton: {
        backgroundColor: '#7A6C64',
    },
    deleteButton: {
        backgroundColor: '#000', // 삭제버튼 색상
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default boardDetail;