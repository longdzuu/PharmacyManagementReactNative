import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';

const ChiTietThuoc = () => {
  const [maThuoc, setMaThuoc] = useState('');
  const [tenThuoc, setTenThuoc] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [nhaSanXuat, setNhaSanXuat] = useState('');
  const [congDung, setCongDung] = useState('');
  const [hsd, setHsd] = useState('');
  const [gia, setGia] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { thuoc } = route.params;

  useEffect(() => {
    setMaThuoc(thuoc.maThuoc);
    setTenThuoc(thuoc.tenThuoc);
    setSoLuong(thuoc.soLuong);
    setNhaSanXuat(thuoc.nhaSanXuat);
    setCongDung(thuoc.congDung);
    setHsd(thuoc.hsd);
    setGia(thuoc.gia);
    const base64ToUri = (base64) => `data:img/jpeg;base64,${thuoc.img}`;
    setImageUri(base64ToUri);
  }, [thuoc]);

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

  const capNhapThuoc = async (id) => {
    const base64Image = await convertImageToBase64(imageUri);
    const updatedThuoc = {
      maThuoc,
      tenThuoc,
      soLuong,
      nhaSanXuat,
      congDung,
      hsd,
      gia,
      img: base64Image,
    };

    try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/thuoc/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedThuoc),
      });

      if (response.ok) {
        setModalVisible(true);
      } else {
        const errorData = await response.json();
        alert(`Cập nhật thất bại: ${errorData.message || 'Có lỗi xảy ra trên máy chủ.'}`);
      }
    } catch (error) {
      console.error('Error updating thuốc:', error);
      alert('Đã xảy ra lỗi khi cập nhật thuốc');
    }
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mã thuốc:</Text>
      <TextInput
        style={styles.input}
        value={maThuoc}
        onChangeText={setMaThuoc}
        editable={false}
      />
      <Text style={styles.label}>Tên thuốc:</Text>
      <TextInput
        style={styles.input}
        value={tenThuoc}
        onChangeText={setTenThuoc}
      />
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
      <TextInput
        style={styles.input}
        value={soLuong}
        onChangeText={setSoLuong}
      />
      <Text style={styles.label}>Nhà sản xuất:</Text>
      <TextInput
        style={styles.input}
        value={nhaSanXuat}
        onChangeText={setNhaSanXuat}
      />
      <Text style={styles.label}>Công dụng:</Text>
      <TextInput
        style={styles.input}
        value={congDung}
        onChangeText={setCongDung}
      />
      <Text style={styles.label}>Hạn sử dụng:</Text>
      <TextInput
        style={styles.input}
        value={hsd}
        onChangeText={setHsd}
      />
      <Text style={styles.label}>Giá:</Text>
      <TextInput
        style={styles.input}
        value={gia}
        onChangeText={setGia}
      />
      <Button title="Cập nhật" onPress={() => capNhapThuoc(thuoc._id)} />
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Cập nhật thành công</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#d6d6d6',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                color: 'black',
                fontSize: 18,
              }}>Ok</Text>
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
    marginBottom: 2,
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
    width: 80,
    height: 80,
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
});

export default ChiTietThuoc;
