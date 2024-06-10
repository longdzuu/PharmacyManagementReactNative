import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HoaDonList = () => {
  const navigation = useNavigation();
  const [hoadonData, setHoaDonData] = useState([]);

  useEffect(() => {
    const fetchHoaDonData = async () => {
      try {
        const response = await fetch('http://192.168.114.40:5000/pharmacy/hoaDon');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHoaDonData(data);
      } catch (error) {
        console.error('Error fetching hoadon data:', error);
      }
    };

    fetchHoaDonData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Chi tiết hóa đơn', { hoaDon: item })}
    >
      <Text style={styles.text}>Số hóa đơn: {item.soHD}</Text>
      <Text style={styles.text}>Tên KH: {item.tenKH}</Text>
      <Text style={styles.text}>Ngày lập: {item.ngayLap}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hoadonData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default HoaDonList;
