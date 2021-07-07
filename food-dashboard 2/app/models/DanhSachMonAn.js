export default class DanhSachMonAn {
  constructor() {
    this.mangMonAn = [];
  }

  themMonAn(monAn) {
    //this.mangMonAn.push(monAn)
    this.mangMonAn = [...this.mangMonAn, monAn];
  }

  timViTri(maMon) {
    return this.mangMonAn.findIndex(function (item) {
      return maMon === item.maMon;
    });
  }

  xoaMonAn(maMon) {
    var viTri = this.timViTri(maMon);
    if (viTri !== -1) {
      return this.mangMonAn.splice(viTri, 1);
    }
  }

  suaMonAn(maMon) {
    var viTri = this.timViTri(maMon);
    if (viTri !== -1) {
      return this.mangMonAn[viTri];
    }
  }

  capNhatMonAn(monanmoi) {
    var viTri = this.timViTri(monanmoi.maMon);
    if (viTri !== -1) {
      return (this.mangMonAn[viTri] = monanmoi);
    }
  }

  showMonAn(dsma, chuoiShow) {
    dsma.filter((sp) => {
      return sp.loaiMon.indexOf(chuoiShow) !== -1;
    });
  }
}
