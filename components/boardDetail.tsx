import React, {useState} from 'react';
import { Alert, Button, Text, View } from 'react-native';

function boardDetail({ route  , navigation}) {

    const {data, deleteReg, listModifyReg} = route.params;

    const [detailData, setDetailData] = useState(data);

    const delGo = ()=>{
        Alert.alert('글삭제','진짜로 삭제?', [
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
        navigation.navigate('BoardModify',{data, modifyReg})
    }

    const modifyReg = (updateItem)=>{
        setDetailData(updateItem)
        listModifyReg(updateItem)
    }

    return (
        <View>
            <Text>상세이지롱</Text>
            <Text>{detailData.title}</Text>
            <Text>{detailData.content}</Text>

            <Button title="수정" onPress={modifyGo} />
            <Button title="삭제" onPress={delGo}/>
        </View>
    );
}

export default boardDetail;