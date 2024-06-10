import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 
import Modal from 'react-native-modal';
import { Searchbar, Card } from 'react-native-paper';

const numColumns = 2;

const DanhSachThuoc = () => {
  const navigation = useNavigation(); 
  const isFocused = useIsFocused(); 
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [selectedItemName, setselectedItemName] = useState('');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isFocused) {
      fetchItems(); 
    }
  }, [isFocused]);

  const handleDelete = async () => {
    try {
      await fetch(`http://192.168.114.40:5000/pharmacy/thuoc/${deleteItemId}`, {
        method: 'DELETE'
      });
      setData(data.filter(item => item.maThuoc !== deleteItemId));
      setDeleteModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('http://192.168.114.40:5000/pharmacy/thuoc');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const nhomThuoc = (nhomThuoc) => {
    switch (nhomThuoc) {
      case "Kháng sinh":
        return require('../../assets/images/khangSinh.jpeg');
      case "Thuốc giảm đau":
        return require('../../assets/images/giamDau.jpeg');
      case "Thuốc tim mạch":
        return require('../../assets/images/timMach.jpeg');
      case "Thuốc chống viêm":
        return require('../../assets/images/chongViem.jpeg');
      default:
        return require('../../assets/images/download.jpeg');
    }
  };

  const base64ToUri = (base64) => `data:img/jpeg;base64,${base64}`;

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query === '') {
      fetchItems();
      return;
    }

    try {
      const response = await fetch(`http://192.168.114.40:5000/pharmacy/thuoc/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const searchData = await response.json();
      setData([searchData]); // Wrap searchData in an array

    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('Chi tiết thuốc', { thuoc: item });
      }}
    >
      <View style={styles.item}>
        <Image source={{ uri: base64ToUri(item.img) }} style={styles.image} />
        <Text style={styles.itemText}>{item.tenThuoc}</Text>
        <Text style={styles.itemText}>Số lượng: {item.soLuong}</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => {
          setDeleteItemId(item.maThuoc);
          setselectedItemName(item.tenThuoc);
          setDeleteModalVisible(true);
        }}>
          <Image source={require('../../assets/images/icons8-delete-60.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
      >             
        <Card.Content style={{ marginTop: 10 }}>
          <Searchbar
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 10 }}>
          </TouchableOpacity>
        </Card.Content>            
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.maThuoc}
          numColumns={numColumns}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn xoá thuốc {selectedItemName} không?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleDelete}          
                style={{ backgroundColor: '#d6d6d6', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
              >     
              <Text style={{ color: 'black', fontSize: 18 }}>Đồng ý</Text>        
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}        
                style={{ backgroundColor: '#d6d6d6', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
              >     
              <Text style={{ color: 'black', fontSize: 18 }}>Hủy</Text>        
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    margin: 15,
    width: '250px', 
    height: '200%',
  },
  item: {
    marginStart: '10px',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
    width: 130, 
    height: 130, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    elevation: 5, 
  },
  image: {
    width: '80%',
    height: '60%',
    resizeMode: 'cover',
    marginStart: 15,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
  },
  // Style for delete icon
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  // Modal styles
  modalContent: {
    backgroundColor: '#d6d6d6',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DanhSachThuoc;
