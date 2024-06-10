import HoaDon from '../Class/HoaDon';
class dataHD{
 static async fetchDSHD() {
    try {
      const response = await fetch('http://192.168.114.40:5000/pharmacy/hoaDon');
      const data = await response.json();
      console.log("Hoa donnnn"+data);
      return data.map(item => new HoaDon(item.soHD, item.tenKH, item.soDT, item.ngayLap, item.tongTien, item.thuoc));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  static async getDSHD() {
    if (!this.data) {
      this.data = await this.fetchDSHD();
    }
    console.log(this.data);
    return this.data;
  }

  static async getJSON() {
    const data = await this.getDSHD();
    const result = data.reduce((acc, curr) => {
      const [year, month] = curr.ngayLap.split('-');
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = 0;
      }
      acc[year][month] += curr.tongTien;
      return acc;
    }, {});

  const dataBar = Object.keys(result).map(year => ({
    year: parseInt(year),
    dataBar: Object.keys(result[year])
      .sort((a, b) => parseInt(a) - parseInt(b)) // Sắp xếp tháng theo thứ tự tăng dần
      .map(month => ({
        Moneys: result[year][month],
        Month: month
      }))
  }));

  return JSON.stringify(dataBar);
}
}


export default dataHD;
