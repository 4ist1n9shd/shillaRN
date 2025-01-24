import { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ReviewWrite({ route, navigation}) {
    const {setDatas, nowId, setNowId} = route.params

    const[title, setTitle] = useState('');
    const[content, setContent] = useState('')

    const saveGo =() =>{
        const newItem = {
            id:nowId, title:title, content:content
        }

        setNowId(nowId+1);

        setDatas((prevDatas)=> [...prevDatas,newItem])

        navigation.goBack();    // 화면 뒤로
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>리뷰 작성</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력하세요"
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveGo}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF8F4',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
      },
      textArea: {
        height: 300,
        textAlignVertical: 'top',
      },
      saveButton: {
        backgroundColor: '#7A6C64',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });

export default ReviewWrite;