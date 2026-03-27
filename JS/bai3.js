
function tinhThueThuNhap() {
    const element = {
        errorHoTen3: document.getElementById('errorHoTen3'),
        errorThuNhap: document.getElementById('errorThuNhap'),
        errorSoNguoiPhuThuoc: document.getElementById('errorSoNguoiPhuThuoc'),
        resultWrapper3: document.getElementById('resultWrapper3'),
        txtResult3: document.getElementById('txtResult3'),
    };

    hideError(element.errorHoTen3);
    hideError(element.errorThuNhap);
    hideError(element.errorSoNguoiPhuThuoc);
    if (element.resultWrapper3) element.resultWrapper3.classList.add('hidden');

    const hoTen = document.getElementById('hoTen3').value;
    const thuNhapInput = document.getElementById('thuNhap').value;
    const soNguoiPhuThuocInput = document.getElementById('soNguoiPhuThuoc').value;

    let isValid = true;

    if (hoTen.trim() === '') {
        showError(element.errorHoTen3, 'Vui lòng nhập họ tên');
        isValid = false;
    }

    const thuNhapNam = Number(thuNhapInput);
    const soNguoi = Number(soNguoiPhuThuocInput);

    if (thuNhapInput === '' || !Number.isFinite(thuNhapNam) || thuNhapNam < 0) {
        showError(element.errorThuNhap, 'Tổng thu nhập năm phải là số >= 0');
        isValid = false;
    }

    if (soNguoiPhuThuocInput === '' || !Number.isFinite(soNguoi) || soNguoi < 0 || !Number.isInteger(soNguoi)) {
        showError(element.errorSoNguoiPhuThuoc, 'Số người phụ thuộc phải là số nguyên >= 0');
        isValid = false;
    }

    if (!isValid) return;

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

    const resultWrapper3 = element.resultWrapper3;
    const txtResult3 = element.txtResult3;
    if (!resultWrapper3 || !txtResult3) return;

    resultWrapper3.classList.remove('hidden');
    
    const formattedTienThue = new Intl.NumberFormat('vi-VN').format(tienThue);

    txtResult3.innerHTML = `Họ tên: ${hoTen} <br> Tiền thuế thu nhập cá nhân: ${formattedTienThue} VNĐ`;

    resultWrapper3.classList.remove('bg-red-50', 'border-red-200', 'text-red-700');
    resultWrapper3.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
}
