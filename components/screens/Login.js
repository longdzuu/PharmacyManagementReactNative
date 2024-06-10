import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import Checkbox from '../Ultils/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = async () => {
    try {
      // acc test
      if (phoneNumber === 'admin' && password === '123') {
        setErrorMessage('');
        if (savePassword) {
          await AsyncStorage.setItem('phoneNumber', phoneNumber);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('phoneNumber');
          await AsyncStorage.removeItem('password');
        }
        onLogin({ name: 'Admin', isAdmin: true });
        return; 
      }

      // kiểm tra nếu là kh
      const customerResponse = await fetch('http://192.168.114.40:5000/pharmacy/khachHang');
      const customerData = await customerResponse.json();
      const customer = customerData.find(cust => cust.soDT === phoneNumber && password === '1');

      if (customer) {
        setErrorMessage('');
        if (savePassword) {
          await AsyncStorage.setItem('phoneNumber', phoneNumber);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('phoneNumber');
          await AsyncStorage.removeItem('password');
        }
        onLogin({ ...customer, isCustomer: true, name: customer.tenKH});
        return;
      }

      // iểm tra nếu là nv
      const employeeResponse = await fetch('http://192.168.114.40:5000/pharmacy/nhanVien');
      const employeeData = await employeeResponse.json();
      const employee = employeeData.find(emp => emp.soDT === phoneNumber && emp.matKhau+"" === password);

      if (employee) {
        setErrorMessage('');
        if (savePassword) {
          await AsyncStorage.setItem('phoneNumber', phoneNumber);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('phoneNumber');
          await AsyncStorage.removeItem('password');
        }
        onLogin({ ...employee, isEmployee: true });
      } else {
        setErrorMessage('Tài khoản hoặc mật khẩu sai!');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
  };

  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedPhoneNumber && savedPassword) {
        setPhoneNumber(savedPhoneNumber);
        setPassword(savedPassword);
        setSavePassword(true);
      }
    };

    loadSavedCredentials();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Checkbox
            label="Lưu mật khẩu"
            isChecked={savePassword}
            onCheck={(checked) => setSavePassword(checked)}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.text}>Đăng nhập</Text>
          </TouchableOpacity>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;