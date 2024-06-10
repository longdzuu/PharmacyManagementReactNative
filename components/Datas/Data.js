import Thuoc from '../Class/Thuoc';
import QuanLyThuoc from '../screens/QuanLyThuoc';

export default class Data {
  static danhSachThuoc = [];

  static khoiTao() {
    const thuoc1 = new Thuoc('1', 'Panadol', '100', 'ABC Pharma', 'Giảm đau', '01/01/2023', '01/01/2025', 'Thuốc giảm đau');
    const thuoc2 = new Thuoc('2', 'Paracetamol', '100', 'XYZ Company', 'Hạ sốt', '02/02/2023', '02/02/2025', 'Thuốc hạ sốt');
    const thuoc3 = new Thuoc('3', 'Amoxicilin', '100','DEF Drug', 'Kháng sinh', '03/03/2023', '03/03/2025', 'Kháng sinh');
    const thuoc4 = new Thuoc('4', 'Ibuprofen', '100','JKL Pharm', 'Chống viêm', '05/05/2023', '05/05/2025', 'Thuốc giảm đau');
    const thuoc5 = new Thuoc('5', 'Aspirin', '100','MNO Drugs', 'Chống viêm', '06/06/2023', '06/06/2025', 'Thuốc chống viêm');

    // Thêm các thuốc vào danh sách
    this.danhSachThuoc.push(thuoc1);
    this.danhSachThuoc.push(thuoc2);
    this.danhSachThuoc.push(thuoc3);
    this.danhSachThuoc.push(thuoc4);
    this.danhSachThuoc.push(thuoc5);
  }

  static getDanhSachThuoc() {
    return this.danhSachThuoc;
  }

  static themThuocMoi(thuoc) {
    this.danhSachThuoc.push(thuoc);
  }

  static xoaThuoc(maThuoc) {
    this.danhSachThuoc = this.danhSachThuoc.filter(thuoc => thuoc.getMaThuoc() !== maThuoc);
  }

  static capNhapThuoc(thuoc:Thuoc) {
    for(let i = 0; i < this.danhSachThuoc.length; i++){
      if(thuoc.getMaThuoc() === this.danhSachThuoc[i].getMaThuoc()){
        this.danhSachThuoc[i].setTenThuoc(thuoc.getTenThuoc());
        this.danhSachThuoc[i].setSoLuong(thuoc.getSoLuong());
        this.danhSachThuoc[i].setNhaSanXuat(thuoc.getNhaSanXuat());
        this.danhSachThuoc[i].setCongDung(thuoc.getCongDung());
        this.danhSachThuoc[i].setNgaySanXuat(thuoc.getNgaySanXuat());
        this.danhSachThuoc[i].setHsd(thuoc.getHsd());
        this.danhSachThuoc[i].setNhomThuoc(thuoc.getNhomThuoc());
        break; 
      }
    }
  }
}
