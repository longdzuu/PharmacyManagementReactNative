import Thuoc from '../Class/Thuoc';
export default class QuanLyThuoc {
  constructor() {
    this.danhSachThuoc = [];
  }

  getDanhSachThuoc() {
    return this.danhSachThuoc;
  }

  setDanhSachThuoc(danhSachThuoc) {
    this.danhSachThuoc = danhSachThuoc;
  }

  themThuoc(thuoc: Thuoc) {
    this.danhSachThuoc.push(thuoc);
  }

  suaThuoc(maThuoc, thongTinMoi) {
    const index = this.danhSachThuoc.findIndex(thuoc => thuoc.maThuoc === maThuoc);
    if (index !== -1) {
      this.danhSachThuoc[index] = { ...this.danhSachThuoc[index], ...thongTinMoi };
    }
  }

  xoaThuoc(maThuoc) {
    for(let i = 0; i < this.danhSachThuoc.length; i++){
      if(maThuoc === this.danhSachThuoc[i].getMaThuoc()){
        this.danhSachThuoc.splice(i, 1);
        break; 
      }
    }
  }
}


