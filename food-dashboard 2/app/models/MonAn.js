export default class MonAn {
  constructor(
    _maMon,
    _tenMon,
    _loaiMon,
    _giaMon,
    _khuyenMai,
    _tinhTrang,
    _hinhMon,
    _moTa
  ) {
    this.maMon = _maMon;
    this.tenMon = _tenMon;
    this.loaiMon = _loaiMon;
    this.giaMon = _giaMon;
    this.khuyenMai = _khuyenMai;
    this.tinhTrang = _tinhTrang;
    this.hinhMon = _hinhMon;
    this.moTa = _moTa;
  }
  tinhGiaKhuyenMai() {
    this.giaKM = (this.giaMon * (100 - this.khuyenMai)) / 100;
  }
}
