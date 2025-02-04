import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

function ReviewModify({ route, navigation}) {
  const { data, modifyReg } = route.params;
    
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [imgUrl, setImgUrl] = useState(data.imageUrl);
  const [savedFilePath, setSavedFilePath] = useState(null);

  useEffect(() => {
      requestCamPermission();
      requestStoragePermission();
  }, []);

  const requestCamPermission = async () => {
      const ret = await request(PERMISSIONS.ANDROID.CAMERA);
      if (ret !== RESULTS.GRANTED) {
          Alert.alert('권한 필요', '카메라 권한 필요');
      }
  };

  const requestStoragePermission = async () => {
      const ret = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (ret !== RESULTS.GRANTED) {
          Alert.alert('권한 필요', '갤러리 접근 권한 필요');
      }
  };

  const openCamera = async () => {
      launchCamera(
          { mediaType: 'photo', saveToPhotos: true, quality: 1 },
          async (res) => {
              if (!res.didCancel && !res.errorCode) {
                  handleImageSelection(res);
              }
          }
      );
  };

  const openGallery = async () => {
      launchImageLibrary(
          { mediaType: 'photo', quality: 1 },
          (res) => {
              if (!res.didCancel && !res.errorCode) {
                  handleImageSelection(res);
              }
          }
      );
  };

  const handleImageSelection = async (res) => {
      if (res.assets && res.assets.length > 0) {
          const selectedImage = res.assets[0];
          setImgUrl(selectedImage.uri);

          const appFolderPath = RNFS.DocumentDirectoryPath + '/photo_reviews';
          const filePath = appFolderPath + '/' + selectedImage.fileName;

          try {
              const folderExists = await RNFS.exists(appFolderPath);
              if (!folderExists) {
                  await RNFS.mkdir(appFolderPath);
              }
              await RNFS.copyFile(selectedImage.uri, filePath);
              setSavedFilePath('file://' + filePath);
          } catch (error) {
              console.log('파일 저장 실패:', error);
          }
      }
  };

  const modifyClk = () => {
      const newItem = {
          id: data.id,
          title,
          content,
          imageUrl: savedFilePath || imgUrl,
      };
      modifyReg(newItem);
      navigation.goBack();
  };

  return (
      <ScrollView style={styles.container}>
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
          
          {imgUrl && <Image source={{ uri: imgUrl }} style={styles.image} />}

          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                  <Text style={styles.buttonText}>카메라</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
                  <Text style={styles.buttonText}>갤러리</Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={modifyClk}>
              <Text style={styles.saveButtonText}>수정</Text>
          </TouchableOpacity>
      </ScrollView>
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
        height: 200,
        textAlignVertical: 'top',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cameraButton: {
        flex: 1,
        backgroundColor: '#505050',
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 8,
    },
    galleryButton: {
        flex: 1,
        backgroundColor: '#A69F91',
        paddingVertical: 12,
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#7A6C64',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
  });

export default ReviewModify;