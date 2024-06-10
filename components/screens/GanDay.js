import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const GanDay = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedDrugs, setSelectedDrugs] = useState(new Set());
  const [latestInvoice, setLatestInvoice] = useState(null);
  const [drugsInInvoice, setDrugsInInvoice] = useState([]);
  const [allDrugs, setAllDrugs] = useState([]);
  const { sdt } = route.params;

  useEffect(() => {
    const fetchLatestInvoice = async () => {
      try {
        const response = await fetch(`http://192.168.114.40:5000/pharmacy/hoaDon/${sdt}`);
        const data = await response.json();
        setLatestInvoice(data.latestInvoice);
        setDrugsInInvoice(data.latestInvoice.thuoc);
        console.log("Fetched latest invoice drugs:", data.latestInvoice.thuoc);
      } catch (error) {
        console.error('Error fetching latest invoice:', error);
      }
    };

    const fetchAllDrugs = async () => {
      try {
        const response = await fetch('http://192.168.114.40:5000/pharmacy/thuoc');
        const data = await response.json();
        setAllDrugs(data);
      } catch (error) {
        console.error('Error fetching all drugs:', error);
      }
    };

    fetchLatestInvoice();
    fetchAllDrugs();
  }, [sdt]);

  const toggleSelection = (id) => {
    const newSet = new Set(selectedDrugs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedDrugs(newSet);
  };

  const submitSelectedDrugs = () => {
    const selectedDrugsArray = drugsInInvoice.filter(drug => selectedDrugs.has(drug.maThuoc));
    navigation.navigate('Thanh toán', { selectedDrugs: selectedDrugsArray, sdt });
  };

  const base64ToUri = (base64) => `data:image/jpeg;base64,${base64}`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView style={styles.scrollContainer}>
          {latestInvoice && (
            <>
              <Text style={styles.invoiceTitle}>Thông tin hóa đơn mới nhất</Text>
              <Text style={styles.text}>Tên khách hàng: {latestInvoice.tenKH}</Text>
              <Text style={styles.text}>Ngày lập: {latestInvoice.ngayLap}</Text>
              <Text style={styles.text}>Tổng tiền: {latestInvoice.tongTien}</Text>
              <Text style={styles.text}>Danh sách thuốc trong hóa đơn:</Text>
              {drugsInInvoice.map(drug => (
                <TouchableOpacity key={drug.maThuoc} style={styles.item} onPress={() => toggleSelection(drug.maThuoc)}>
                  <View style={styles.radioCircle}>
                    {selectedDrugs.has(drug.maThuoc) && <View style={styles.radioDot} />}
                  </View>
                  <View style={styles.infoContainer}>
                    <Image source={{ uri: base64ToUri(allDrugs.find(d => d.maThuoc === drug.maThuoc)?.img || '') }} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{allDrugs.find(d => d.maThuoc === drug.maThuoc)?.tenThuoc || 'Unknown'}</Text>
                      <Text style={styles.quantity}>SL: {drug.soLuong}</Text>
                      <Text style={styles.text}>{drug.giaBan}$</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={submitSelectedDrugs}>
            <Text style={styles.buttonText}>Chọn thuốc</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'black',
    backgroundColor: '#9abcd7',
    margin: 5,
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  quantity: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default GanDay;
