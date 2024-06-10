import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const numColumns = 3;

const data = [
  { id: '1', name: 'Bán thuốc', image: require('../../assets/images/icon_sell.jpg')},
  { id: '2', name: 'Kho thuốc', image: require('../../assets/images/icon_warhouse.jpg')},
  { id: '3', name: 'Nhân viên', image: require('../../assets/images/icon_customer.jpg')},
  { id: '4', name: 'Khách hàng', image: require('../../assets/images/icon_customer.jpg')},
  { id: '5', name: 'Thống kê', image: require('../../assets/images/icons8-bar-chart-50.png')},
  { id: '6', name: 'Thông tin', image: require('../../assets/images/icon_info.jpg')},
];

const Trangchu = () => {
  const navigation = useNavigation(); 
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
         if (item.id === '1') {
          navigation.navigate('Chọn Khách Hàng');
        } else if (item.id === '2') {
          navigation.navigate('Danh sách thuốc');
        }else if (item.id === '3') {
          navigation.navigate('Danh sách nhân viên');
        } else if (item.id === '4') {
          navigation.navigate('Danh sách khách hàng');
        } else if (item.id === '5') {
          navigation.navigate('Thống kê doanh thu'); 
        }else if (item.id === '6') {
          navigation.navigate('Danh sách hóa đơn');
        }
      }}
    >
      <View style={styles.item}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
      >
        <Image source={require('../../assets/images/logo.png')} style={styles.gridItemImage} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
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
    resizeMode: 'cover', 
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    width: '250px', 
    height: '100%',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
    width: 100, 
    height: 100, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    elevation: 5, 
  },
  image: {
    width: '60%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 13,
    color: '#333',
     fontWeight: 'bold', 
    marginTop: 5,
  },
  gridItemImage: {
    marginBottom: 20,
    marginStart: '20%',
    marginTop: '5%',
  }
});

export default Trangchu;
