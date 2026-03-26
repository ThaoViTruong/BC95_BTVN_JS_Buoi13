
function getDiemKhuVuc(khuVuc) {
    switch (khuVuc) {
        case 'A': return 2;
        case 'B': return 1;
        case 'C': return 0.5;
        default: return 0; // X hoặc không thuộc danh sách
    }
}

function getDiemDoiTuong(doiTuong) {
    switch (doiTuong) {
        case '1': return 2.5;
        case '2': return 1.5;
        case '3': return 1;
        default: return 0; // 0 hoặc không thuộc danh sách
    }
}

function tinhDiemTuyenSinh() {
    // 1. Lấy dữ liệu từ các input
    const diemChuan = document.getElementById('diemChuan').value;
    const khuVuc = document.getElementById('khuVuc').value;
    const doiTuong = document.getElementById('doiTuong').value;
    const diemMon1 = document.getElementById('diemMon1').value;
    const diemMon2 = document.getElementById('diemMon2').value;
    const diemMon3 = document.getElementById('diemMon3').value;

    // Kiểm tra xem người dùng đã nhập đủ chưa
    if (!diemChuan || !diemMon1 || !diemMon2 || !diemMon3) {
        alert('Vui lòng nhập đầy đủ điểm chuẩn và điểm 3 môn!');
        return;
    }

    // Ép kiểu về số
    const dChuan = Number(diemChuan);
    const dMon1 = Number(diemMon1);
    const dMon2 = Number(diemMon2);
    const dMon3 = Number(diemMon3);

    const diemUuTienKV = getDiemKhuVuc(khuVuc);
    const diemUuTienDT = getDiemDoiTuong(doiTuong);

    // 2. Tính tổng điểm
    const tongDiem = dMon1 + dMon2 + dMon3 + diemUuTienKV + diemUuTienDT;

    // 3. Kiểm tra kết quả đậu / rớt
    let ketQua = '';
    let isPass = false;

    // Nếu có 1 môn điểm 0 -> rớt luôn
    if (dMon1 === 0 || dMon2 === 0 || dMon3 === 0) {
        ketQua = `Bạn đã rớt. Do có môn bị điểm 0.`;
    } else if (tongDiem >= dChuan) {
        ketQua = `Bạn đã đậu. Tổng điểm: ${tongDiem}`;
        isPass = true;
    } else {
        ketQua = `Bạn đã rớt. Tổng điểm: ${tongDiem}`;
    }


    const resultWrapper = document.getElementById('resultWrapper');
    const txtResult = document.getElementById('txtResult');

    resultWrapper.classList.remove('hidden');
    txtResult.innerHTML = ketQua;


    if (isPass) {
        resultWrapper.classList.remove('bg-red-50', 'border-red-200', 'text-red-700');
        resultWrapper.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
    } else {
        resultWrapper.classList.remove('bg-green-50', 'border-green-200', 'text-green-700');
        resultWrapper.classList.add('bg-red-50', 'border-red-200', 'text-red-700');
    }
}
