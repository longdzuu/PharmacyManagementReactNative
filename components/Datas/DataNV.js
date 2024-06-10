import NhanVien from '../Class/NhanVien';

class Data {
  static danhSachNhanVien = [
    new NhanVien(
      1,
      'Nguyễn Văn B',
      '1234567879',
      '12/12/2002',
      'Nam',
      'Gò Vấp, TP.Hồ Chí Minh',
      'Quản lý'
    ),
    new NhanVien(
      2,
      'Trần Văn E',
      '5431248979',
      '11/11/2000',
      'Nam',
      'Thủ Đức, TP.Hồ Chí Minh',
      'Nhân viên'
    ),
    new NhanVien(
      3,
      'Nguyễn K',
      '7895601234',
      '10/8/2000',
      'Nữ',
      'Bình Thạnh, TP.Hồ Chí Minh',
      'Nhân viên'
    ),
    new NhanVien(
      4,
      'Lê Thị P',
      '1932124587',
      '22/04/2002',
      'Nữ',
      'Gò Vấp, TP.Hồ Chí Minh',
      'Nhân viên'
    ),
  ];

  static getdanhSachNhanVien() {
    return this.danhSachNhanVien;
  }

  static themNV(nhanVien) {
    this.danhSachNhanVien.push(nhanVien);
  }

  static xoaNV(id) {
    this.danhSachNhanVien = this.danhSachNhanVien.filter(
      (nv) => nv.id !== id
    );
  }

 
}

export default Data;
