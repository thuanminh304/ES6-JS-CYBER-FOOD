import DanhSachMonAn from "../models/DanhSachMonAn.js";
import MonAn from "../models/MonAn.js";

const danhSachMon = new DanhSachMonAn();

// const getEle = (id) => {
//     return document.getElementById(id);
// }

const getEle = (id) => document.getElementById(id);

getEle("btnThem").addEventListener("click", () => {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemMon").style.display = "block";
  getEle("foodForm").reset() 
});

//xoa mon an
const _xoaMonAn = (maMon) => {
  danhSachMon.xoaMonAn(maMon);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage();
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
  monanmoi.tinhGiaKhuyenMai();
  danhSachMon.capNhatMonAn(monanmoi);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage(danhSachMon.mangMonAn);

  document.querySelector('.close').click()
  console.log(monanmoi);

});
// show món ăn
getEle("selLoai").addEventListener("keyup", () => {
  var chuoiShow = getEle("selLoai").value;
  var mangMA = getLocalStorage();

  if(chuoiShow)
  var chuoiCanShow = danhSachMon.showMonAn(mangMA, chuoiShow);

  hienThiMonAn(chuoiCanShow);
});
/**
 * Hàm hiển thị danh sách món ăn
 */
const hienThiMonAn = (danhSachMon) => {
  let content = "";

  danhSachMon.forEach((mon) => {
    const {
      maMon,
      hinhMon,
      tenMon,
      loaiMon,
      giaMon,
      khuyenMai,
      giaKM,
      tinhTrang,
    } = mon;

    content += `
            <tr>
                <td>${maMon}</td>
                <td>
                    <img src="../../assets/img/${hinhMon}" />
                    <span>${tenMon}</span>
                </td>
                <td>${loaiMon === "loai1" ? "Chay" : "Mặn"}</td>
                <td>${giaMon}</td>
                <td>${khuyenMai}</td>
                <td>${giaKM}</td>
                <td>${tinhTrang === "1" ? "Còn" : "Hết"}</td>
                <td>
                    <button class="btn btn-danger" onclick="_xoaMonAn('${maMon}')">Xoá</button>
                    <button class="btn btn-success" onclick="_suaMonAn('${maMon}')">Sửa</button>
                </td>
            </tr>
        `;
  });
  getEle("tbodyFood").innerHTML = content;
};

window._xoaMonAn = _xoaMonAn;
window._suaMonAn = _suaMonAn;

const setLocalStorage = (danhSachMon) => {
  localStorage.setItem("danhSachMon", JSON.stringify(danhSachMon));
};

const getLocalStorage = () => {
  if (localStorage.getItem("danhSachMon")) {
    danhSachMon.mangMonAn = JSON.parse(localStorage.getItem("danhSachMon"));
    hienThiMonAn(danhSachMon.mangMonAn);
  }
};

getLocalStorage();

/**
 * Hàm thêm món ăn
 */
const themMonAn = () => {
  // Lấy thông tin từ form
  const ma = getEle("foodID").value;
  const ten = getEle("tenMon").value;
  const loai = getEle("loai").value;
  const gia = getEle("giaMon").value;
  const khuyenMai = getEle("khuyenMai").value;
  const tinhTrang = getEle("tinhTrang").value;
  const hinh = getEle("hinhMon").value;
  const moTa = getEle("moTa").value;

  // Khởi tạo đối tượng monAn từ lớp đối tượng MonAn
  // +: ép từ chuỗi thành số
  const monAn = new MonAn(
    ma,
    ten,
    loai,
    +gia,
    +khuyenMai,
    tinhTrang,
    hinh,
    moTa
  );
  monAn.tinhGiaKhuyenMai();
  danhSachMon.themMonAn(monAn);
  hienThiMonAn(danhSachMon.mangMonAn);
  setLocalStorage(danhSachMon.mangMonAn);
  getEle("foodID").readOnly
};

getEle("btnThemMon").addEventListener("click", themMonAn);
