import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DSKH = () => {
  const [customers, setCustomers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://192.168.114.40:5000/pharmacy/khachHang');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}>
        <FlatList
          data={customers}
          keyExtractor={item => item._id} // Make sure to convert id to string
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => {
              navigation.navigate('Chọn thuốc', { name: item.tenKH, sdt: item.soDT });
            }}>
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.tenKH}</Text>
                <Text style={styles.phone}>{item.soDT}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust background image resize mode as needed
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    flexDirection: 'row', // Arrange content horizontally
    alignItems: 'center', // Align content vertically in center
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemInfo: {
    flex: 1, // Make itemInfo fill most of the horizontal space
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: '#555',
  },
});

export default DSKH;
