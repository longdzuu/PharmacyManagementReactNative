import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectYear = ({ onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => 2021 + i);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleChange = (year) => {
    setSelectedYear(year);
      const intYear = parseInt(year, 10);
    if (onChange) {
  
      onChange(intYear);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn năm:</Text>
      <Picker
        selectedValue={selectedYear}
        style={styles.picker}
        onValueChange={(itemValue) => handleChange(itemValue)}>
        {years.map((year) => (
          <Picker.Item key={year} label={`${year}`} value={year} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    flexDirection: 'row', // Align items in a row
    padding: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default SelectYear;
