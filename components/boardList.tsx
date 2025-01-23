import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';


function boardList({navigation}) {

    const [nowId, setNowId] = useState(4)
    const [datas, setDatas] = useState([
        {id:1, title:'제목1', content:'내용1'},
        {id:2, title:'제목2', content:'내용2'},
        {id:3, title:'제목3', content:'내용3'}
    ])

    const writeGo = ()=> {
    //    Alert.alert("눌렀냐옹?")
        navigation.navigate('BoardWrite', {setDatas, nowId, setNowId});
    }

    const detailGo = ( data )=> {
        
         navigation.navigate('BoardDetail',{data, deleteReg, listModifyReg});
     }

     const deleteReg = (delId)=>{
        setDatas((prevDatas)=> prevDatas.filter((item)=> item.id != delId))
     }

     const listModifyReg = (newItem)=>{
        setDatas((prevDatas)=> prevDatas.map((item)=> item.id == newItem.id ? newItem : item ))
     }

    return (
        <View>
            <Text>List</Text>

            <TouchableOpacity style={styles.btn} onPress={writeGo}>
                <Text>글안쓰기</Text>
            </TouchableOpacity>

            <FlatList data={datas}
            keyExtractor={(item)=> item.id}
            renderItem={
                ({item}) => (
                    <TouchableOpacity onPress={ ()=>detailGo(item)   }>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )
            }  />



            
        </View>
    );
}

const styles = StyleSheet.create({
    btn :{
        backgroundColor:"#0ff",
        margin:20 ,
        alignItems:'center'
    }
})

export default boardList;