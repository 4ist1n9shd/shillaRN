import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ReviewModify({ route, navigation}) {
    const {data, modifyReg} = route.params;

    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);

    const modifyClk = ()=>{
        const newItem = { id : data.id, title, content }
        modifyReg(newItem)
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>리뷰 수정</Text>
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
          <TouchableOpacity style={styles.saveButton} onPress={modifyClk}>
            <Text style={styles.saveButtonText}>수정</Text>
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

export default ReviewModify;