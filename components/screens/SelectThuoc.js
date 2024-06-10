import { Text, SafeAreaView, StyleSheet,ImageBackground } from 'react-native';
const SelectThuoc = ()=> {
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
     source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
    </ImageBackground>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },backgroundImage: {
    width: '100%',  
    height: '100%' 
  }
});
export default SelectThuoc;