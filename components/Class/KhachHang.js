// KhachHang.js
class KhachHang {
  constructor(maKH, tenKH, soDT, birthday, gender, address) {
    this.maKH = maKH; 
    this.tenKH = tenKH;
    this.soDT = soDT;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
  }

  getTenKH() {
    return this.tenKH;
  }

  getSoDT() {
    return this.soDT;
  }

  getBirthday() {
    return this.birthday;
  }

  getGender() {
    return this.gender;
  }

  getAddress() {
    return this.address;
  }
}

export default KhachHang;
