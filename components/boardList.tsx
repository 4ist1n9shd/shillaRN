import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function boardModify({ route  , navigation}) {

    const {data,modifyReg} = route.params;

    const [title, setTitle] = useState(data.title)
    const [content, setContent] = useState(data.content)

    const modifyClk = ()=>{
        const newItem = { id : data.id, title, content }
        modifyReg(newItem)
        navigation.goBack()
    }
    const cancelClk = () => {
        navigation.goBack(); // 수정 취소시 뒤로 가기
    };
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>수정하기</Text>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>제목</Text>
                <TextInput 
                    style={styles.input} 
                    value={title} 
                    onChangeText={setTitle} 
                    placeholder="제목을 입력하세요"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>내용</Text>
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    value={content} 
                    onChangeText={setContent} 
                    placeholder="내용을 입력하세요"
                    multiline
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelClk}>
                    <Text style={styles.buttonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.modifyButton]} onPress={modifyClk}>
                    <Text style={styles.buttonText}>수정</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF8F4',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top', // 내용이 위로 시작되도록
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#000', // 취소 버튼 색상
    },
    modifyButton: {
        backgroundColor: '#7A6C64', // 수정 버튼 색상
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default boardModify;