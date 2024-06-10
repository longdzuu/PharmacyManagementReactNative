import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HoaDonList = ({ userName }) => {
  const navigation = useNavigation();
  const [hoaDonData, setHoaDonData] = useState([]);

  useEffect(() => {
  const fetchHoaDonData = async () => {
    try {
      if (!userName || !userName.trim()) {
        return;
      }
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/hoadon`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setHoaDonData(data);
    } catch (error) {
      console.error('Error fetching hoadon data:', error);
    }
  };

  fetchHoaDonData();
}, [userName]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Chi tiết hóa đơn KH', { hoaDon: item })}
    >
      <Text style={styles.text}>Số hóa đơn: {item.soHD}</Text>
      <Text style={styles.text}>Tên KH: {item.tenKH}</Text>
      <Text style={styles.text}>Ngày lập: {item.ngayLap}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
          source={require('../../assets/images/background.jpg')}
          style={styles.backgroundImage}
        >
      <FlatList
        data={hoaDonData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 13,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
});

export default HoaDonList;