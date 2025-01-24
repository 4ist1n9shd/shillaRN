import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
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
    return (
            <View>
                <Text>수정이지롱</Text>
                <TextInput value={title} onChangeText={setTitle}/>
                <TextInput  value={content} onChangeText={setContent}/>
    
                <Button title="수정"  onPress={modifyClk} />
               
            </View>
        );
}

export default boardModify;