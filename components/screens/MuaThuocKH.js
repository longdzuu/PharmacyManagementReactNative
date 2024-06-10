
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ChonThuoc = ({userName}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedDrugs, setSelectedDrugs] = useState(new Set());
  const [drugs, setDrugs] = useState([]);
  const {name} = {userName};
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
    navigation.navigate('Thanh toán', { selectedDrugs: selectedDrugsArray,name,sdt });
  };

  return (
    <ScrollView style={styles.container}>
      {drugs.map(drug => (
        <TouchableOpacity key={drug._id} style={styles.item} onPress={() => toggleSelection(drug._id)}>
          <View style={styles.radioCircle}>
            {selectedDrugs.has(drug._id) && <View style={styles.radioDot} />}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{drug.tenThuoc}</Text>
            <Text style={styles.quantity}>SL:{drug.soLuong}</Text>
            <Text style={styles.text}>{drug.gia}$</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button} onPress={submitSelectedDrugs}>
        <Text style={styles.buttonText}>Chọn thuốc</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor:'black',
    backgroundColor:'#9abcd7',
    margin:5,
    borderRadius: 12
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
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
    fontSize: 18
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
});

export default ChonThuoc;