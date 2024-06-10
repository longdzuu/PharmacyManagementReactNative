class NhanVien {
  constructor(id, tenNV, soDT, birthday, gender, address, chucvu) {
    this.id = id;
    this.tenNV = tenNV;
    this.soDT = soDT;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.chucvu = chucvu;
 
  }

  getTenNV() {
    return this.tenNV;
  }

  setTenNV(tenNV) {
    this.tenNV = tenNV;
  }

  getSoDT() {
    return this.soDT;
  }

  setSoDT(soDT) {
    this.soDT = soDT;
  }

  getBirthday() {
    return this.birthday;
  }

  setBirthday(birthday) {
    this.birthday = birthday;
  }

  getGender() {
    return this.gender;
  }

  setGender(gender) {
    this.gender = gender;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address) {
    this.address = address;
  }

  getChucVu(){
    return this.chucvu;
  }

  setChucVu(chucvu){
    this.chucvu = chucvu;
  }
}

export default NhanVien;
