import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Modal } from 'react-native';

export default function ChiTietKhachHang({ route, navigation }) {
  const khachHang = route.params?.khachHang; // Nhận khách hàng từ params

  const [tenKH, setTenKH] = useState(khachHang ? khachHang.tenKH : '');
  const [soDT, setSoDT] = useState(khachHang ? khachHang.soDT : '');
  const [ngaySinh, setBirthday] = useState(khachHang ? khachHang.ngaySinh : '');
  const [gioiTinh, setGender] = useState(khachHang ? khachHang.gioiTinh : '');
  const [diaChi, setAddress] = useState(khachHang ? khachHang.diaChi : '');
  const [error, setError] = useState('');
   const [modalVisible, setModalVisible] = useState(false);

  const validateName = (name) => /^[a-zA-ZÀ-ỹ\s]+$/.test(name);
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);
  const validateBirthday = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  const validateGender = (gender) => ['Nam', 'Nữ', 'Khác'].includes(gender);

const handleUpdate = async () => {
    if (!validateName(tenKH)) {
      setError('Tên khách hàng chứa ký tự không hợp lệ');
      return;
    }
    if (!validatePhoneNumber(soDT)) {
      setError('Số điện thoại chỉ được chứa 10 chữ số');
      return;
    }
    if (!validateBirthday(ngaySinh)) {
      setError('Ngày sinh không hợp lệ. Định dạng hợp lệ: dd/mm/yyyy');
      return;
    }
    if (!validateGender(gioiTinh)) {
      setError('Giới tính không hợp lệ. Chọn Nam hoặc Nữ');
      return;
    }

    try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/khachHang/${khachHang._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenKH,
          soDT,
          ngaySinh,
          gioiTinh,
          diaChi,
        }),
      });

      if (response.ok) {
       setModalVisible(true);
        setError('');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
      {error && !validateName(tenKH) && <Text style={styles.errorText}>{error}</Text>}

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
      {error && !validatePhoneNumber(soDT) && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Ngày sinh</Text>
      <TextInput
        style={styles.input}
        value={ngaySinh}
        onChangeText={(text) => {
          setBirthday(text);
          setError('');
        }}
        placeholder="Nhập ngày sinh (dd/mm/yyyy)"
        placeholderTextColor="#888"
      />
      {error && !validateBirthday(ngaySinh) && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.radioContainer}>
        {['Nam', 'Nữ'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => {
              setGender(option);
              setError('');
            }}>
            <View style={styles.radioOuterCircle}>
              {gioiTinh === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && !validateGender(gioiTinh) && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={diaChi}
        onChangeText={(text) => {
          setAddress(text);
          setError('');
        }}
        placeholder="Nhập địa chỉ"
        placeholderTextColor="#888"
      />

      <Button
        title="Cập nhật thông tin"
        onPress={handleUpdate}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
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
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
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
  }
});
