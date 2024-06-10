import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Checkbox = ({ label, style, onCheck, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    const newState = !checked;
    setChecked(newState);
    if (onCheck) {
      onCheck(newState);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Image
        style={styles.checkbox}
        source={checked ? require('../../assets/images/checked.png') : require('../../assets/images/icons8-checkbox-100.png')}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  label: {
    marginLeft: 8,
  },
});

export default Checkbox;

