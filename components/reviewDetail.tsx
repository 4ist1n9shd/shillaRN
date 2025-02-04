import { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

function ReviewDetail({ route, navigation }) {
    const {data, deleteReg, listModifyReg} = route.params;
    const [detailData, setDetailData] = useState(data);

    const delGo = () => {
        Alert.alert('리뷰 삭제','정말로 삭제하시겠습니까?', [
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
            },
        ]);
    }

    const modifyGo = () => {
        navigation.navigate('ReviewModify', { data, modifyReg });
    };

    const modifyReg = (updateItem) => {
        setDetailData(updateItem);
        listModifyReg(updateItem);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>{detailData.title}</Text>
            </View>

            <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <Text style={styles.text}>{detailData.content}</Text>
            </View>

            {detailData.imageUrl && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: detailData.imageUrl }} style={styles.image} />
                </View>
            )}

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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF8F4',
    },
    inputContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textAreaContainer: {
        minHeight: 250,
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modifyButton: {
        backgroundColor: '#7A6C64',
    },
    deleteButton: {
        backgroundColor: '#333',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
    

export default ReviewDetail;