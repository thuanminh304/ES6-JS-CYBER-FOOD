const getEle = (id) => document.getElementById(id);

import DanhSachMonAn from "../models/DanhSachMonAn.js";
import MonAn from "../models/MonAn.js";

const danhSachMon = new DanhSachMonAn();

getEle("btnThem").addEventListener("click", () => {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemMon").style.display = "block";
});
//xoa mon an
const _xoaMonAn = (maMon) => {
  danhSachMon.xoaMonAn(maMon);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage(danhSachMon.mangMonAn);
};
//sua mon an
const _suaMonAn = (maMon) => {
  getEle("btnThem").click();
  getEle("btnCapNhat").style.display = "block";
  getEle("btnThemMon").style.display = "none";
  const monAnMoi = danhSachMon.suaMonAn(maMon);

  getEle("foodID").value = monAnMoi.maMon;
  getEle("tenMon").value = monAnMoi.tenMon;
  getEle("loai").value = monAnMoi.loaiMon;
  getEle("giaMon").value = monAnMoi.giaMon;
  getEle("khuyenMai").value = monAnMoi.khuyenMai;
  getEle("tinhTrang").value = monAnMoi.tinhTrang;
  getEle("hinhMon").value = monAnMoi.hinhMon;
  getEle("moTa").value = monAnMoi.moTa;

  // hienThiMonAn(danhSachMon.monAnMoi);
};
//cap nhat mon an
var capNhatMonAn = getEle("btnCapNhat");
capNhatMonAn.addEventListener("click", () => {
  const ma = getEle("foodID").value;
  const ten = getEle("tenMon").value;
  const loai = getEle("loai").value;
  const gia = getEle("giaMon").value;
  const km = getEle("khuyenMai").value;
  const tinhTrangMon = getEle("tinhTrang").value;
  const hinh = getEle("hinhMon").value;
  const moTa = getEle("moTa").value;

  const monanmoi = new MonAn(
    ma,
    ten,
    loai,
    +gia,
    +km,
    tinhTrangMon,
    hinh,
    moTa
  );
  console.log(monanmoi);
  danhSachMon.capNhatMonAn(monanmoi);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage(danhSachMon.mangMonAn);
});
// show món ăn
getEle("selLoai").addEventListener("keyup", () => {
  var chuoiShow = getEle("selLoai").value;
  var mangMA = getLocalStorage();

  if(chuoiShow)
  var chuoiCanShow = danhSachMon.showMonAn(mangMA, chuoiShow);

  hienThiMonAn(chuoiCanShow);
});

//hàm hiển thị danh sach món ăn
const hienThiMonAn = (danhSachMon) => {
  let content = "";

  danhSachMon.forEach((mon) => {
    const {
      maMon,
      hinhMon,
      tenMon,
      loaiMon,
      giaMon,
      giaKM,
      khuyenMai,
      tinhTrang,
    } = mon;
    content += `
    <tr>
            <td>${maMon}</td>
            <td>
                <img src="../../assets/img/${hinhMon}" >
                <span>${tenMon} </span>
            </td>
            <td>${loaiMon === "loai1" ? "Chay" : "Mặn"}</td>
            <td>${giaMon}</td>
            <td>${khuyenMai}</td>
            <td>${giaKM}</td>
            <td>${tinhTrang === "1" ? "Còn" : "Hết"}</td>
            <td>
                <button class="btn btn-danger" onclick="_xoaMonAn('${maMon}')">Xóa</button>
                <button class="btn btn-success" onclick="_suaMonAn('${maMon}')" >Sửa</button>
            </td>
    
    </tr>
    
    `;
  });
  getEle("tbodyFood").innerHTML = content;
};

window._xoaMonAn = _xoaMonAn;
window._suaMonAn = _suaMonAn;
window.capNhatMonAn = capNhatMonAn;
//tạo localstorage

const setLocalStorage = (danhSachMon) => {
  localStorage.setItem("DanhSachMon", JSON.stringify(danhSachMon));
};

const getLocalStorage = () => {
  if (localStorage.getItem("DanhSachMon")) {
    danhSachMon.mangMonAn = JSON.parse(localStorage.getItem("DanhSachMon"));
    hienThiMonAn(danhSachMon.mangMonAn);
  }
};
getLocalStorage();

//hàm thêm món ăn
const themMonAn = () => {
  //lấy thống tin từ form
  const ma = getEle("foodID").value;
  const ten = getEle("tenMon").value;
  const loai = getEle("loai").value;
  const gia = getEle("giaMon").value;
  const km = getEle("khuyenMai").value;
  const tinhTrangMon = getEle("tinhTrang").value;
  const hinh = getEle("hinhMon").value;
  const moTa = getEle("moTa").value;

  //khởi tạo đối tượng monAn từ lớp đối tượng MonAn
  // ép kiểu chuỗi thành number thêm dấu + phía trước
  const monAn = new MonAn(ma, ten, loai, +gia, +km, tinhTrangMon, hinh, moTa);
  monAn.tinhGiaKhuyenMai();
  danhSachMon.themMonAn(monAn);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage(danhSachMon.mangMonAn);
};

getEle("btnThemMon").addEventListener("click", themMonAn);
