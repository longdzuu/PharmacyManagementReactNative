import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Star = ({ filled, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.star}
        source={
          filled
            ? require('../../assets/images/hightLightStar.png')  
            : require('../../assets/images/emptyStar.png')  
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 30,
    height: 30,
    margin: 5,
  },
});

export default Star;
