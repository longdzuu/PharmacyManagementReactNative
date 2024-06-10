import KhachHang from '../Class/KhachHang';

class Data {
  static danhSachKhachHang = [
    new KhachHang(
      1,
      'Nguyễn Văn A',
      '123456789',
      '12/12/2002',
      'Nam',
      'Gò Vấp, TP.Hồ Chí Minh'
    ),
    new KhachHang(
      2,
      'Trần Văn B',
      '543124879',
      '11/11/2000',
      'Nam',
      'Thủ Đức, TP.Hồ Chí Minh'
    ),
    new KhachHang(
      3,
      'Nguyễn C',
      '789561234',
      '10/8/2000',
      'Nữ',
      'Bình Thạnh, TP.Hồ Chí Minh'
    ),
    new KhachHang(
      4,
      'Lê Thị D',
      '132124587',
      '22/04/2002',
      'Nữ',
      'Gò Vấp, TP.Hồ Chí Minh'
    ),
  ];

  static getDanhSachKhachHang() {
    return this.danhSachKhachHang;
  }

  static themKH(khachHang) {
    this.danhSachKhachHang.push(khachHang);
  }

  static xoaKH(id) {
    this.danhSachKhachHang = this.danhSachKhachHang.filter(
      (kh) => kh.id !== id
    );
  }
}

export default Data;
