function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function setKetNoiVisible(isVisible) {
  const wrap = document.getElementById('ketNoiWrap');
  const input = document.getElementById('soKetNoi');
  if (!wrap || !input) return;

  if (isVisible) {
    wrap.classList.remove('hidden');
    input.disabled = false;
  } else {
    wrap.classList.add('hidden');
    input.disabled = true;
    input.value = '';
  }
}

function handleLoaiKhachHangChange() {
  const loai = document.getElementById('loaiKhachHang')?.value;
  setKetNoiVisible(loai === 'doanhNghiep');
  const errorSoKetNoi = document.getElementById('errorSoKetNoi');
  if (loai !== 'doanhNghiep') hideError(errorSoKetNoi);
}

function tinhTienCap() {
  const element = {
    errorLoaiKhachHang: document.getElementById('errorLoaiKhachHang'),
    errorMaKhachHang: document.getElementById('errorMaKhachHang'),
    errorSoKenhCaoCap: document.getElementById('errorSoKenhCaoCap'),
    errorSoKetNoi: document.getElementById('errorSoKetNoi'),
    resultWrapper4: document.getElementById('resultWrapper4'),
    txtResult4: document.getElementById('txtResult4'),
  };

  hideError(element.errorLoaiKhachHang);
  hideError(element.errorMaKhachHang);
  hideError(element.errorSoKenhCaoCap);
  hideError(element.errorSoKetNoi);
  if (element.resultWrapper4) element.resultWrapper4.classList.add('hidden');

  const loai = document.getElementById('loaiKhachHang')?.value ?? '';
  const ma = document.getElementById('maKhachHang')?.value ?? '';
  const soKenhStr = document.getElementById('soKenhCaoCap')?.value ?? '';
  const soKetNoiStr = document.getElementById('soKetNoi')?.value ?? '';

  const soKenh = Number(soKenhStr);
  const soKetNoi = Number(soKetNoiStr);

  let isValid = true;

  if (loai === '') {
    showError(element.errorLoaiKhachHang, 'Vui lòng chọn loại khách hàng');
    isValid = false;
  }

  if (ma.trim() === '') {
    showError(element.errorMaKhachHang, 'Vui lòng nhập mã khách hàng');
    isValid = false;
  }

  if (soKenhStr === '' || !Number.isFinite(soKenh) || soKenh < 0 || !Number.isInteger(soKenh)) {
    showError(element.errorSoKenhCaoCap, 'Số kênh cao cấp phải là số nguyên >= 0');
    isValid = false;
  }

  if (loai === 'doanhNghiep') {
    if (soKetNoiStr === '' || !Number.isFinite(soKetNoi) || soKetNoi <= 0 || !Number.isInteger(soKetNoi)) {
      showError(element.errorSoKetNoi, 'Số kết nối phải là số nguyên > 0');
      isValid = false;
    }
  }

  if (!isValid) return;

  let tongTien = 0;

  if (loai === 'nhaDan') {
    tongTien = 4.5 + 20.5 + soKenh * 7.5;
  } else if (loai === 'doanhNghiep') {
    const phiXuLy = 15;
    const phiCoBan = 75;
    const phiThemKetNoi = soKetNoi > 10 ? (soKetNoi - 10) * 5 : 0;
    const phiKenhCaoCap = soKenh * 50;
    tongTien = phiXuLy + phiCoBan + phiThemKetNoi + phiKenhCaoCap;
  } else {
    return;
  }

  const resultWrapper4 = element.resultWrapper4;
  const txtResult4 = element.txtResult4;
  if (!resultWrapper4 || !txtResult4) return;

  resultWrapper4.classList.remove('hidden');
  resultWrapper4.classList.remove('bg-red-50', 'border-red-200', 'text-red-700');
  resultWrapper4.classList.add('bg-green-50', 'border-green-200', 'text-green-700');

  txtResult4.innerHTML = `Mã khách hàng: ${ma}<br>Tiền cáp: ${formatUSD(tongTien)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('loaiKhachHang');
  if (select) {
    select.addEventListener('change', handleLoaiKhachHangChange);
  }
  handleLoaiKhachHangChange();
});
