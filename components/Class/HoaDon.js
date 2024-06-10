class HoaDon {
  constructor(soHD, tenKH, soDT, ngayLap, tongTien = 0, thuoc = []) {
    this.soHD = soHD;
    this.tenKH = tenKH;
    this.soDT = soDT;
    this.ngayLap = ngayLap;
    this.tongTien = tongTien;
    this.thuoc = thuoc; 
  }

  // Phương thức tính tổng tiền từ danh sách thuốc
  tinhTongTien() {
    this.tongTien = this.thuoc.reduce((total, item) => total + item.soLuong * item.giaBan, 0);
  }

  // Phương thức để thêm thuốc vào hóa đơn
  themThuoc(maThuoc, soLuong, giaBan) {
    this.thuoc.push({ maThuoc, soLuong, giaBan });
    this.tinhTongTien();
  }
}
export default HoaDon