
function tinhTienDien() {
    // 1. Lấy dữ liệu từ các input
    const hoTen = document.getElementById('hoTen').value;
    const soKwInput = document.getElementById('soKw').value;

    // Kiểm tra xem người dùng đã nhập đủ chưa
    if (!hoTen || !soKwInput) {
        alert('Vui lòng nhập đầy đủ họ tên và số Kw tiêu thụ!');
        return;
    }

    const soKw = Number(soKwInput);

    if (soKw < 0) {
        alert('Số Kw không hợp lệ!');
        return;
    }

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

    const resultWrapper2 = document.getElementById('resultWrapper2');
    const txtResult2 = document.getElementById('txtResult2');

    resultWrapper2.classList.remove('hidden');
    
    const formattedTien = new Intl.NumberFormat('vi-VN').format(tongTien);

    txtResult2.innerHTML = `Họ tên: ${hoTen} <br> Tiền điện: ${formattedTien} VNĐ`;
    
    resultWrapper2.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
}
