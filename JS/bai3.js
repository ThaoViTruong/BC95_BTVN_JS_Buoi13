
function tinhThueThuNhap() {
    const hoTen = document.getElementById('hoTen3').value;
    const thuNhapInput = document.getElementById('thuNhap').value;
    const soNguoiPhuThuocInput = document.getElementById('soNguoiPhuThuoc').value;

    if (hoTen.trim() === '' || thuNhapInput === '' || soNguoiPhuThuocInput === '') {
        alert('Vui lòng nhập đầy đủ thông tin: Họ tên, Tổng thu nhập năm và Số người phụ thuộc!');
        return;
    }

    const thuNhapNam = Number(thuNhapInput);
    const soNguoi = Number(soNguoiPhuThuocInput);

    if (!Number.isFinite(thuNhapNam) || !Number.isFinite(soNguoi) || thuNhapNam < 0 || soNguoi < 0) {
        alert('Thu nhập và Số người phụ thuộc không được là số âm!');
        return;
    }

    const THU_NHAP_MIEN_THUE = 4e6;
    const MIEN_THUE_PHU_THUOC = 1.6e6;

    const thuNhapChiuThue = thuNhapNam - THU_NHAP_MIEN_THUE - (soNguoi * MIEN_THUE_PHU_THUOC);

    let tienThue = 0;

    if (thuNhapChiuThue <= 0) {
        tienThue = 0;
    } else {
        let thueSuat = 0;

        if (thuNhapChiuThue <= 60e6) thueSuat = 0.05;
        else if (thuNhapChiuThue <= 120e6) thueSuat = 0.10;
        else if (thuNhapChiuThue <= 210e6) thueSuat = 0.15;
        else if (thuNhapChiuThue <= 384e6) thueSuat = 0.20;
        else if (thuNhapChiuThue <= 624e6) thueSuat = 0.25;
        else if (thuNhapChiuThue <= 960e6) thueSuat = 0.30;
        else thueSuat = 0.35;

        tienThue = thuNhapChiuThue * thueSuat;
    }

    const resultWrapper3 = document.getElementById('resultWrapper3');
    const txtResult3 = document.getElementById('txtResult3');

    resultWrapper3.classList.remove('hidden');
    
    const formattedTienThue = new Intl.NumberFormat('vi-VN').format(tienThue);

    txtResult3.innerHTML = `Họ tên: ${hoTen} <br> Tiền thuế thu nhập cá nhân: ${formattedTienThue} VNĐ`;

    resultWrapper3.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
}
