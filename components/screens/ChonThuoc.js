import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ChonThuoc = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedDrugs, setSelectedDrugs] = useState(new Set());
  const [drugs, setDrugs] = useState([]);
  const { name, sdt } = route.params;

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch('http://192.168.114.40:5000/pharmacy/thuoc');
        const data = await response.json();
        setDrugs(data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchDrugs();
  }, [route.params]);

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
    const selectedDrugsArray = drugs.filter(drug => selectedDrugs.has(drug._id));
    navigation.navigate('Thanh toán', { selectedDrugs: selectedDrugsArray, name, sdt });
  };

  const goToHistory = () => {
    navigation.navigate('Lịch sử mua', { sdt });
  };

  const goToSuggestions = () => {
    navigation.navigate('Gần đây', {sdt});
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
        {drugs.map(drug => (
          <TouchableOpacity key={drug._id} style={styles.item} onPress={() => toggleSelection(drug._id)}>
            <View style={styles.radioCircle}>
              {selectedDrugs.has(drug._id) && <View style={styles.radioDot} />}
            </View>
            <View style={styles.infoContainer}>
              <Image source={{ uri: base64ToUri(drug.img) }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{drug.tenThuoc}</Text>
                <Text style={styles.quantity}>SL: {drug.soLuong}</Text>
                <Text style={styles.text}>{drug.gia}$</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={submitSelectedDrugs}>
          <Text style={styles.buttonText}>Chọn thuốc</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={goToHistory}>
          <Text style={styles.buttonText}>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={goToSuggestions}>
          <Text style={styles.buttonText}>Gần đây</Text>
        </TouchableOpacity>
      </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
  },backgroundImage:{
    width: '100%',
    height: '100%',
  }

});

export default ChonThuoc;
