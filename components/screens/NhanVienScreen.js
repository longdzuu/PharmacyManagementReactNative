import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Picker
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const API_URL = 'http://192.168.114.40:5000/pharmacy/nhanVien';


const DanhSachNhanVien = ({ navigation }) => {
  const [nhanVien, setNhanVien] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
 

    useEffect(() => {
    const loadData = async () => {
      const nhanVienS = await fetchNhanVien();
      setData(nhanVienS);
    };
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);
//API LẤY DANH SÁCH NV
  const fetchNhanVien = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách nhân viên từ máy chủ');
      }
      const data = await response.json();
      setNhanVien(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', error.message);
    }
  };
//API XÓA NHÂN VIÊN THEO ID
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Xóa nhân viên không thành công');
      }
      setNhanVien(nhanVien.filter((nv) => nv._id !== id));
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() =>
          navigation.navigate('Chi tiết nhân viên', { nhanVien: item })
        }>
        <Text style={styles.itemText}>{item.tenNV}</Text>
        <Text style={styles.itemText}>{item.soDT}</Text>
        <Text style={styles.itemText}>{item.chucVu}</Text>
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
      <Button
        title="Thêm"
        onPress={() => navigation.navigate('Thêm nhân viên')}
        color="#1E90FF"
      />
      <FlatList
        data={nhanVien}
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
            <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa nhân viên này không?</Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} color="blue" />
              <Button title="Xóa" onPress={() => handleDelete(deleteId)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function ThemNhanVien() {
  const [tenNV, setTenNV] = useState('');
  const [soDT, setSoDT] = useState('');
  const [ngaySinh, setBirthday] = useState('');
  const [gioiTinh, setGender] = useState('');
  const [diaChi, setAddress] = useState('');
  const [chucvu, setChucVu] = useState(1);
 const [modalVisible, setModalVisible] = useState(false);

const addNhanVien = async () => {
  const bodyData = {
    tenNV: tenNV,
    soDT: soDT,
    ngaySinh: ngaySinh,
    gioiTinh: gioiTinh,
    diaChi: diaChi,
    chucvu: chucvu
  };

  const response = await fetch('http://192.168.114.40:5000/pharmacy/nhanVien', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (response.ok) {
    setModalVisible(true);
    console.log("Thêm thành công");
  }
  return response.json();
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên nhân viên</Text>
      <TextInput
        style={styles.input}
        value={tenNV}
        onChangeText={(text) => {
          setTenNV(text);      
        }}
        placeholder="Nhập tên nhân viên"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={soDT}
        onChangeText={(text) => {
          setSoDT(text);
        }}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={10}
      />
      <Text style={styles.label}>Ngày sinh</Text>
      <TextInput
        style={styles.input}
        value={ngaySinh}
        onChangeText={(text) => {
          setBirthday(text);
        }}
        placeholder="Nhập ngày sinh (dd/mm/yyyy)"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.radioContainer}>
        {['Nam', 'Nữ'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setGender(option)}>
            <View style={styles.radioOuterCircle}>
              {gioiTinh === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={diaChi}
        onChangeText={(text) => {
          setAddress(text);
        }}
        placeholder="Nhập địa chỉ"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Chức vụ</Text>
     <Picker
        selectedValue={chucvu}
        onValueChange={(itemValue) => setChucVu(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
      </Picker>

      <Button
        title="Thêm nhân viên"
        onPress={addNhanVien}
        color="#1E90FF"
      />
      <Modal
        visible={modalVisible}
        backdropOpacity={0.5}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Thêm thành công</Text>
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
}

function ChiTietNhanVien({ route, navigation }) {
  const { nhanVien } = route.params;

  const handleEdit = () => {
    navigation.navigate('Sửa thông tin nhân viên', {
      nhanVien,
      onUpdate: (updatedEmployee) => {
        route.params.onUpdate(updatedEmployee);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên nhân viên: {nhanVien.tenNV}</Text>
      <Text style={styles.label}>Số điện thoại: {nhanVien.soDT}</Text>
      <Text style={styles.label}>Ngày sinh: {nhanVien.ngaySinh}</Text>
      <Text style={styles.label}>Giới tính: {nhanVien.gioiTinh}</Text>
      <Text style={styles.label}>Địa chỉ: {nhanVien.diaChi}</Text>
      <Text style={styles.label}>Chức vụ: {nhanVien.chucVu}</Text>
      <Button title="Sửa thông tin" onPress={handleEdit} color="#1E90FF" />
    </View>
  );
}


function SuaThongTinNhanVien({ route, navigation }) {
  
  const { nhanVien } = route.params;
  const [tenNV, setTenNV] = useState(nhanVien.tenNV);
  const [soDT, setSoDT] = useState(nhanVien.soDT);
  const [birthday, setBirthday] = useState(nhanVien.ngaySinh  );
  const [gender, setGender] = useState(nhanVien.gioiTinh);
  const [address, setAddress] = useState(nhanVien.diaChi);
  const [chucvu, setChucVu] = useState(nhanVien.chucVu);
  const [modalVisible, setModalVisible] = useState(false);
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

//Sửa nhân viên
   const capNhat = async (id) => {

    const updatedNhanVien = {
      tenNV,
      soDT,
      birthday,
      gender,
      address,
      chucvu
    };
try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/nhanVien/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNhanVien),
        
      });
      if(response.ok){
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error updating thuốc:', error);
      alert('Đã xảy ra lỗi khi cập nhập thuốc');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên nhân viên</Text>
      <TextInput
        style={styles.input}
        value={tenNV}
        onChangeText={(text) => {
          setTenNV(text);
          setError('');
        }}
        placeholder="Nhập tên nhân viên"
        placeholderTextColor="#888"
      />
      {error && !validateName(tenNV) ? (
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
        {['Nam', 'Nữ'].map((option) => (
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
      <Text style={styles.label}>Chức vụ</Text>
     <Picker
        selectedValue={chucvu}
        onValueChange={(itemValue) => setChucVu(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
      </Picker>

      <Button
        title="Lưu thông tin"
        onPress={()=>capNhat(nhanVien._id)}
        color="#1E90FF"
      />
      <Modal
        visible={modalVisible}
        backdropOpacity={0.5}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Sửa thành công</Text>
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
}

const NhanVienScreen = () => {
  return (
      <Stack.Navigator >
        <Stack.Screen
          name="Danh sách nhân viên"
          component={DanhSachNhanVien}
          options={{ title: 'Danh sách nhân viên' }}
        />
        <Stack.Screen
          name="Thêm nhân viên"
          component={ThemNhanVien}
          options={{ title: 'Thêm nhân viên' }}
        />
        <Stack.Screen
          name="Chi tiết nhân viên"
          component={ChiTietNhanVien}
          options={{ title: 'Chi tiết nhân viên' }}
        />
        <Stack.Screen
          name="Sửa thông tin nhân viên"
          component={SuaThongTinNhanVien}
          options={{ title: 'Sửa thông tin nhân viên' }}
        />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    marginLeft: 16,
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 8,
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
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
  }
});

export default NhanVienScreen;
