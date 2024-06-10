import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Button,Modal ,Image,ImageBackground} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Data from '../Datas/DataKH';
import KhachHang from '../Class/KhachHang';
//Cac Ham API 
const API_URL = 'http://192.168.114.40:5000/pharmacy/khachHang';
export const fetchKhachHang = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addKhachHang = async (khachHang) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(khachHang),
  });
  return response.json();
};

export const updateKhachHang = async (id, khachHang) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(khachHang),
  });
  return response.json();
};





const Stack = createNativeStackNavigator();

function DanhSachKhachHang({ navigation }) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
    const loadData = async () => {
      const khachHangs = await fetchKhachHang();
      setData(khachHangs);
    };
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

   const handleDelete = async (id) => {
    await deleteKhachHang(id);
    setData(data.filter(item => item._id !== id));
      setModalVisible(false);
  };
//Xoa khach hang API

const deleteKhachHang = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalVisible(true);
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => navigation.navigate('Chi tiết KH', { khachHang: item })}>
        <Text style={styles.itemText}>{item.tenKH}</Text>
        <Text style={styles.itemText}>{item.soDT}</Text>
        <Text style={styles.itemText}>{item.diaChi}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
     <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
      >    
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa khách hàng này không?</Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} color="blue" />
              <Button title="Xóa" onPress={() => handleDelete(deleteId)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
      </ImageBackground>
    </View>
  );
}

function ThemKhachHang({ navigation }) {
   const [maKH, setmaKH] = useState('');
  const [tenKH, setTenKH] = useState('');
  const [soDT, setSoDT] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => /^[a-zA-ZÀ-ỹ\s]+$/.test(name);
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);
  const validateBirthday = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const isValidDate = (d, m, y) => {
      const dateObj = new Date(y, m - 1, d);
      return (
        dateObj &&
        dateObj.getDate() === d &&
        dateObj.getMonth() === m - 1 &&
        dateObj.getFullYear() === y
      );
    };
    return isValidDate(day, month, year);
  };
  const validateGender = (gender) => ['Nam', 'Nữ'].includes(gender);

   const XuLyThemKhachHang = async () => {
    if (!validateName(tenKH)) {
      setError('Tên khách hàng chứa ký tự không hợp lệ');
      return;
    }
    if (!validatePhoneNumber(soDT)) {
      setError('Số điện thoại chỉ được chứa 10 chữ số');
      return;
    }
    if (!validateBirthday(birthday)) {
      setError('Ngày sinh không hợp lệ. Định dạng hợp lệ: dd/mm/yyyy');
      return;
    }
    if (!validateGender(gender)) {
      setError('Giới tính không hợp lệ. Chọn Nam, Nữ hoặc Khác');
      return;
    }

    const khachHang = {maKH, tenKH, soDT, ngaySinh: birthday, 
    gioiTinh: gender,   
    diaChi: address, };
    await addKhachHang(khachHang);
    setmaKH('');
    setTenKH('');
    setSoDT('');
    setBirthday('');
    setGender('');
    setAddress('');
    setError('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
     <Text style={styles.label}>Mã Khách Hàng</Text>
      <TextInput
        style={styles.input}
        value={maKH}
        onChangeText={(text) => {
          setmaKH(text);
          setError('');
        }}
        placeholder="Nhập mã khách hàng"
        placeholderTextColor="#888"
      />
      {error && !validateName(tenKH) ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <Text style={styles.label}>Tên khách hàng</Text>
      <TextInput
        style={styles.input}
        value={tenKH}
        onChangeText={(text) => {
          setTenKH(text);
          setError('');
        }}
        placeholder="Nhập tên khách hàng"
        placeholderTextColor="#888"
      />
      {error && !validateName(tenKH) ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={soDT}
        onChangeText={(text) => {
          setSoDT(text);
          setError('');
        }}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={10}
      />
      {error && !validatePhoneNumber(soDT) ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Text style={styles.label}>Ngày sinh</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={(text) => {
          setBirthday(text);
          setError('');
        }}
        placeholder="Nhập ngày sinh (dd/mm/yyyy)"
        placeholderTextColor="#888"
      />
      {error && !validateBirthday(birthday) ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.radioContainer}>
        {['Nam', 'Nữ', 'Khác'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setGender(option)}>
            <View style={styles.radioOuterCircle}>
              {gender === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && !validateGender(gender) ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          setError('');
        }}
        placeholder="Nhập địa chỉ"
        placeholderTextColor="#888"
      />

      <Button
        title="Thêm khách hàng"
        onPress={XuLyThemKhachHang}
        color="#1E90FF"
      />
    </View>
  );
}


const KhachHangScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Danh sách khách hàng">
      <Stack.Screen name="Danh sách khách hàng"
      options={({ navigation }) => ({
                headerRight: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Thêm khách hàng')}
                      style={{ marginRight: 15 }}
                    >
                      <Image
                        source={require('../../assets/images/icons8-add-50.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              })} component={DanhSachKhachHang}/>
      <Stack.Screen name="Thêm khách hàng" component={ThemKhachHang} />
      
      
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    // padding: 20,
  },
  list: {
    paddingVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#1E90FF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default KhachHangScreen;
