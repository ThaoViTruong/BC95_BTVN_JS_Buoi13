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
}

function tinhTienCap() {
  const loai = document.getElementById('loaiKhachHang')?.value ?? '';
  const ma = document.getElementById('maKhachHang')?.value ?? '';
  const soKenhStr = document.getElementById('soKenhCaoCap')?.value ?? '';
  const soKetNoiStr = document.getElementById('soKetNoi')?.value ?? '';

  if (loai === '') {
    alert('Vui lòng chọn loại khách hàng!');
    return;
  }

  if (ma.trim() === '') {
    alert('Vui lòng nhập mã khách hàng!');
    return;
  }

  const soKenh = Number(soKenhStr);
  if (!Number.isFinite(soKenh) || soKenh < 0) {
    alert('Số kênh cao cấp không hợp lệ!');
    return;
  }

  let tongTien = 0;

  if (loai === 'nhaDan') {
    tongTien = 4.5 + 20.5 + soKenh * 7.5;
  } else if (loai === 'doanhNghiep') {
    const soKetNoi = Number(soKetNoiStr);
    if (!Number.isFinite(soKetNoi) || soKetNoi <= 0) {
      alert('Vui lòng nhập số kết nối hợp lệ!');
      return;
    }

    const phiXuLy = 15;
    const phiCoBan = 75;
    const phiThemKetNoi = soKetNoi > 10 ? (soKetNoi - 10) * 5 : 0;
    const phiKenhCaoCap = soKenh * 50;
    tongTien = phiXuLy + phiCoBan + phiThemKetNoi + phiKenhCaoCap;
  } else {
    alert('Loại khách hàng không hợp lệ!');
    return;
  }

  const resultWrapper4 = document.getElementById('resultWrapper4');
  const txtResult4 = document.getElementById('txtResult4');

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
