import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import SelectYear from '../Ultils/SelectYear';
import dataHD from '../Datas/DataHD';
import processData from '../Ultils/Processing';

const ThongKe = () => {
  const [dataDaxuly, capnhatlaidata] = useState({});
  const [yearPick, updateYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await dataHD.getJSON();
      const hoadonData = JSON.parse(jsonData);
      console.log(hoadonData);
      const newData = getDataFromYear(yearPick, hoadonData);
      const datadaxulynhungchuastate = processData(newData);
      capnhatlaidata(datadaxulynhungchuastate);
    };
    fetchData();
  }, [yearPick]);

  const getDataFromYear = (yearpick, hoadonData) => {
    const yearData = hoadonData.find((data) => data.year === yearpick);
    return yearData ? yearData : [];
  };

  const onChangeYear = (yearpick) => {
    updateYear(yearpick);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <SelectYear onChange={onChangeYear} />
        <View style={{backgroundColor:'white'}} key = {yearPick}>
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={dataDaxuly.dataBar}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
        <Text style={styles.descriptionText}>
            Trục Y: Doanh thu (vnd)
          </Text>
          <Text style={styles.descriptionText}>
            Trục X: Tháng trong năm {yearPick}
          </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  descriptionText: {
    textAlign: 'left',
    fontSize: 15,
    marginTop: 10,
    marginStart: 20,
  }
});

export default ThongKe;
