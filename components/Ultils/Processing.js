
const processData = (datachuaxuly) => {
  var datadaxyly = {dataBar : [], maxmonth : ""};
  if(!datachuaxuly || !datachuaxuly == null){
    datadaxyly.dataBar = [
        {value: 250, label: '1'},
        {value: 500, label: '2', frontColor: '#177AD5'},
        {value: 745, label: '3'},
        {value: 320, label: '4'},
        {value: 600, label: '5', frontColor: '#177AD5'},
        {value: 256, label: '6'},
        {value: 800, label: '7',frontColor: '#177AD5'},
    ];
        datadaxyly.maxmonth = '7';
  }else{
    // xử lý dữ liệu ở đây;

        let maxValue = -Infinity; // Khởi tạo giá trị lớn nhất với giá trị âm vô cùng
        let maxIndex = -1;

        for (let i = 0; i < datachuaxuly.dataBar.length; i++) {
          const item = datachuaxuly.dataBar[i];
          if (item.Moneys > maxValue) {
            maxValue = item.Moneys;
            maxIndex = i;
          }
        }
        datadaxyly.year = datachuaxuly.year;
        datadaxyly.maxmonth = datachuaxuly.dataBar[maxIndex].Month;
         datadaxyly.dataBar = datachuaxuly.dataBar.map((item, index) => ({
          value: item.Moneys,
          label:item.Month,
          frontColor: ( index === maxIndex) ? 'red' : index % 2 === 0 ? 'lightgray' : '#177AD5', // lớn nhất màu đỏ 
          spacing : 8 // khoảng cách giữa các cột
         

        }));
      
       
  }

  return datadaxyly;
};

export default processData;