
function tinhTienDien() {
    const element = {
        errorHoTen2: document.getElementById('errorHoTen2'),
        errorSoKw: document.getElementById('errorSoKw'),
        resultWrapper2: document.getElementById('resultWrapper2'),
        txtResult2: document.getElementById('txtResult2'),
    };

    hideError(element.errorHoTen2);
    hideError(element.errorSoKw);
    if (element.resultWrapper2) element.resultWrapper2.classList.add('hidden');

    const hoTen = document.getElementById('hoTen').value;
    const soKwInput = document.getElementById('soKw').value;

    let isValid = true;

    if (hoTen.trim() === '') {
        showError(element.errorHoTen2, 'Vui lòng nhập họ tên');
        isValid = false;
    }

    const soKw = Number(soKwInput);
    if (soKwInput === '' || !Number.isFinite(soKw) || soKw < 0) {
        showError(element.errorSoKw, 'Số kw phải là số >= 0');
        isValid = false;
    }

    if (!isValid) return;

    // 2. Tính tiền điện theo các mức
    let tongTien = 0;

    if (soKw <= 50) {
        tongTien = soKw * 500;
    } else if (soKw <= 100) {
        tongTien = (50 * 500) + ((soKw - 50) * 650);
    } else if (soKw <= 200) {
        tongTien = (50 * 500) + (50 * 650) + ((soKw - 100) * 850);
    } else if (soKw <= 350) {
        tongTien = (50 * 500) + (50 * 650) + (100 * 850) + ((soKw - 200) * 1100);
    } else {
        tongTien = (50 * 500) + (50 * 650) + (100 * 850) + (150 * 1100) + ((soKw - 350) * 1300);
    }

    const resultWrapper2 = element.resultWrapper2;
    const txtResult2 = element.txtResult2;
    if (!resultWrapper2 || !txtResult2) return;

    resultWrapper2.classList.remove('hidden');
    
    const formattedTien = new Intl.NumberFormat('vi-VN').format(tongTien);

    txtResult2.innerHTML = `Họ tên: ${hoTen} <br> Tiền điện: ${formattedTien} VNĐ`;
    
    resultWrapper2.classList.remove('bg-red-50', 'border-red-200', 'text-red-700');
    resultWrapper2.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
}
