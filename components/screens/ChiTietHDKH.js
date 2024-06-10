import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Star from '../Ultils/Rating';  

const ChiTietHD = ({ route }) => {
  const { hoaDon } = route.params;
  const [rating, setRating] = useState(0);
  const [nhanxet, setNhanxet] = useState('');

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const fetchNhanxet = async () => {
    try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/nhanxetHD/${hoaDon.soHD}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const searchData = await response.json();
      setNhanxet(searchData.nhanxet); 
      setRating(searchData.chamdiem); 

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchNhanxet();
  }, [hoaDon.soHD]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/nhanxetHD/${hoaDon.soHD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          soHD: hoaDon.soHD, 
          nhanxet: nhanxet, 
          chamdiem: rating 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        console.log('Cập nhật thành công');
      }

    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Số hóa đơn: {hoaDon.soHD}</Text>
      <Text style={styles.text}>Tên KH: {hoaDon.tenKH}</Text>
      <Text style={styles.text}>Ngày lập: {hoaDon.ngayLap}</Text>
      <Text style={styles.text}>Danh sách sản phẩm:</Text>
      {hoaDon.thuoc.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>Mã thuốc: {item.maThuoc}</Text>
          <Text style={styles.text}>Số lượng: {item.soLuong}</Text>
          <Text style={styles.text}>Giá: {item.giaBan}</Text>
        </View>
      ))}
      <Text style={styles.text}>Tổng tiền: {hoaDon.tongTien}</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>Khách hàng nhận xét:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onPress={() => handleRating(star)}
          />
        ))}
      </View>
      <TextInput
        style={{ marginBottom: 15 }}
        value={nhanxet}
        onChangeText={setNhanxet} 
      />
      <Button title="Cập nhật" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  text: {
    fontSize: 13,
    marginBottom: 5,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
});

export default ChiTietHD;