import React, { useState } from 'react';
import { Button, Text, View ,TextInput, TouchableOpacity, StyleSheet} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

function boardWrite({ route  , navigation}) {

    const {setDatas, nowId, setNowId} = route.params

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const saveGo = () =>{

        const newItem ={
            id:nowId, 
            title:title, 
            content:content
        }

        setNowId(nowId+1)

        setDatas((prevDatas)=> [...prevDatas,newItem])

        navigation.goBack() // 화면 뒤로
    };
    const cancelGo = () => {
        navigation.goBack(); // 화면 뒤로
    };
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>글쓰기</Text>

            <View style={styles.inputContainer}>
            <TextInput 
                value={title} 
                onChangeText={setTitle} 
                placeholder='제목을 입력하세요'
                style={styles.input}
            />
            <TextInput 
                value={content} 
                onChangeText={setContent} 
                placeholder='내용을 입력하세요'
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={5}
            />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveGo}>
                    <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelGo}>
                    <Text style={styles.buttonText}>취소</Text>
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
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    textArea: {
        minHeight: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#7A6C64', // 저장 버튼 색상
    },
    cancelButton: {
        backgroundColor: '#000', // 취소 버튼 색상
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default boardWrite;