import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

const ThanhToan = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [drugs, setDrugs] = useState(route.params.selectedDrugs.map(drug => ({ ...drug, soLuong: 1, totalPrice: drug.gia })));
  const { name, sdt } = route.params;

  function generateRandomNumber() {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min) + min);
  }

  const increment = (id) => {
    setDrugs(current =>
      current.map(drug =>
        drug._id === id ? { ...drug, soLuong: drug.soLuong + 1, totalPrice: (drug.soLuong + 1) * drug.gia } : drug
      )
    );
  };

  const decrement = (id) => {
    setDrugs(current =>
      current.map(drug =>
        drug._id === id ? { ...drug, soLuong: Math.max(1, drug.soLuong - 1), totalPrice: Math.max(1, drug.soLuong - 1) * drug.gia } : drug
      )
    );
  };

  const submitInvoice = async () => {
    setModalVisible(true);
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    try {
      const response = await fetch('http://192.168.114.40:5000/pharmacy/hoaDon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          soHD: generateRandomNumber().toString(),
          tenKH: name,
          soDT: sdt,
          ngayLap: formattedDate,
          tongTien: drugs.reduce((acc, curr) => acc + curr.totalPrice, 0),
          thuoc: drugs.map(drug => ({
            maThuoc: drug._id,
            soLuong: drug.soLuong,
            giaBan: drug.gia,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <FlatList
          data={drugs}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: `data:image/jpeg;base64,${item.img}` }} style={styles.drugImage} />
              <Text style={styles.drugName}>{item.tenThuoc}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrement(item._id)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.soLuong}</Text>
                <TouchableOpacity onPress={() => increment(item._id)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.invoiceButton} onPress={() => submitInvoice()}>
              <Text style={styles.invoiceButtonText}>In hóa đơn</Text>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Hóa Đơn</Text>
              <Text style={styles.customerInfo}>Tên khách hàng: {name}</Text>
              <Text style={styles.customerInfo}>SĐT: {sdt}</Text>
              {drugs.map((drug, index) => (
                <View key={index} style={styles.modalItem}>
                  <Text style={styles.modalItemName}>{drug.tenThuoc}</Text>
                  <Text style={styles.modalItemQuantity}>{drug.soLuong} x ${drug.gia}</Text>
                  <Text style={styles.modalItemTotal}>${drug.totalPrice}</Text>
                </View>
              ))}
              <Text>Tổng cộng: ${drugs.reduce((acc, curr) => acc + curr.totalPrice, 0)}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible); 
                  setTimeout(() => navigation.navigate('HomeScreen'), 500);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
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
    backgroundColor: '#ecf0f1',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  drugImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  drugName: {
    flex: 2,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
  quantityContainer: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C5CD',
    borderRadius: 17.5,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  invoiceButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  invoiceButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  customerInfo: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  modalItemName: {
    fontSize: 18,
    flex: 3,
  },
  modalItemQuantity: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  modalItemTotal: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default ThanhToan;
