import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const ThemThuoc = () => {
  const [maThuoc, setMaThuoc] = useState('');
  const [tenThuoc, setTenThuoc] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [nhaSanXuat, setNhaSanXuat] = useState('');
  const [congDung, setCongDung] = useState('');
  const [hsd, setHsd] = useState('');
  const [gia, setGia] = useState('');
//  const [nhomThuoc, setNhomThuoc] = useState('Thuốc hạ sốt');
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để làm việc này!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result); 

    if (!result.cancelled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);  
        console.log('Image URI:', result.assets[0].uri);
    } else if (result.cancelled) {
        console.log('Image picking was cancelled.');
    } else {
        console.log('No assets in result.');
    }
};


  const handleAddMedicine = async () => {
  try {
    // Chuyển đổi ảnh thành base64
    const base64Image = await convertImageToBase64(imageUri);

    const response = await fetch('http://192.168.114.40:5000/pharmacy/thuoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maThuoc,
        tenThuoc,
        soLuong,
        nhaSanXuat,
        congDung,
        hsd,
        gia,
        img: base64Image,
      }),
    });
    if (response.ok) {
      setModalVisible(true);
      resetForm();
    } else {
      Alert.alert('Thêm thuốc không thành công', 'Vui lòng thử lại sau');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau');
  }
};

  //chuyển đổi ảnh thành chuỗi base64
  const convertImageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  // Hàm chuyển đổi blob thành base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  const resetForm = () => {
    setMaThuoc('');
    setTenThuoc('');
    setSoLuong('');
    setNhaSanXuat('');
    setCongDung('');
    setHsd('');
    setGia('');
    //setNhomThuoc('Thuốc hạ sốt');
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mã thuốc:</Text>
      <TextInput style={styles.input} value={maThuoc} onChangeText={setMaThuoc} />
      <Text style={styles.label}>Tên thuốc:</Text>
      <TextInput style={styles.input} value={tenThuoc} onChangeText={setTenThuoc} />
      <Text style={styles.label}>Hình ảnh:</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Chọn ảnh</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Số lượng:</Text>
      <TextInput style={styles.input} value={soLuong} onChangeText={setSoLuong} />
      <Text style={styles.label}>Nhà sản xuất:</Text>
      <TextInput style={styles.input} value={nhaSanXuat} onChangeText={setNhaSanXuat} />
      <Text style={styles.label}>Công dụng:</Text>
      <TextInput style={styles.input} value={congDung} onChangeText={setCongDung} />
      <Text style={styles.label}>Hạn sử dụng:</Text>
      <TextInput style={styles.input} value={hsd} onChangeText={setHsd} />
      <Text style={styles.label}>Giá:</Text>
      <TextInput style={styles.input} value={gia} onChangeText={setGia} />
      <Button title="Thêm thuốc" onPress={handleAddMedicine} />
      <Modal isVisible={modalVisible} backdropOpacity={0.5} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Thêm thuốc thành công</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 3,
    marginBottom: 1,
  },
  imagePicker: {
    marginBottom: 1,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#d6d6d6',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#d6d6d6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default ThemThuoc;
