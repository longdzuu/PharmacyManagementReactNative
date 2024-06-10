class Thuoc {
    constructor(maThuoc, tenThuoc, soLuong, nhaSanXuat, congDung, ngaySanXuat, hsd, nhomThuoc, gia, img) {
        this.maThuoc = maThuoc;
        this.tenThuoc = tenThuoc;
        this.soLuong = soLuong;
        this.nhaSanXuat = nhaSanXuat;
        this.congDung = congDung;
        this.ngaySanXuat = ngaySanXuat;
        this.hsd = hsd;
        this.nhomThuoc = nhomThuoc;
        this.gia = gia;
        this.img = img;
    }

    // Các phương thức getter
    getMaThuoc() {
        return this.maThuoc;
    }

    getTenThuoc() {
        return this.tenThuoc;
    }

    getSoLuong() {
        return this.soLuong;
    }

    getNhaSanXuat() {
        return this.nhaSanXuat;
    }

    getCongDung() {
        return this.congDung;
    }

    getNgaySanXuat() {
        return this.ngaySanXuat;
    }

    getHsd() {
        return this.hsd;
    }

    getNhomThuoc() {
        return this.nhomThuoc;
    }

    getGia() {
        return this.gia;
    }

    getImg() {
        return this.img;
    }
}

