
function showError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
}

function hideError(el) {
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
}

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
    const element = {
        errorDiemChuan: document.getElementById('errorDiemChuan'),
        errorDiemMon1: document.getElementById('errorDiemMon1'),
        errorDiemMon2: document.getElementById('errorDiemMon2'),
        errorDiemMon3: document.getElementById('errorDiemMon3'),
        resultWrapper: document.getElementById('resultWrapper'),
        txtResult: document.getElementById('txtResult'),
    };

    hideError(element.errorDiemChuan);
    hideError(element.errorDiemMon1);
    hideError(element.errorDiemMon2);
    hideError(element.errorDiemMon3);
    if (element.resultWrapper) element.resultWrapper.classList.add('hidden');

    const diemChuanStr = document.getElementById('diemChuan').value;
    const khuVuc = document.getElementById('khuVuc').value;
    const doiTuong = document.getElementById('doiTuong').value;
    const diemMon1Str = document.getElementById('diemMon1').value;
    const diemMon2Str = document.getElementById('diemMon2').value;
    const diemMon3Str = document.getElementById('diemMon3').value;

    let isValid = true;

    const dChuan = Number(diemChuanStr);
    if (diemChuanStr === '' || !Number.isFinite(dChuan) || dChuan < 0 || dChuan > 30) {
        showError(element.errorDiemChuan, 'Điểm chuẩn phải từ 0 đến 30');
        isValid = false;
    }

    const dMon1 = Number(diemMon1Str);
    if (diemMon1Str === '' || !Number.isFinite(dMon1) || dMon1 < 0 || dMon1 > 10) {
        showError(element.errorDiemMon1, 'Điểm môn 1 phải từ 0 đến 10');
        isValid = false;
    }

    const dMon2 = Number(diemMon2Str);
    if (diemMon2Str === '' || !Number.isFinite(dMon2) || dMon2 < 0 || dMon2 > 10) {
        showError(element.errorDiemMon2, 'Điểm môn 2 phải từ 0 đến 10');
        isValid = false;
    }

    const dMon3 = Number(diemMon3Str);
    if (diemMon3Str === '' || !Number.isFinite(dMon3) || dMon3 < 0 || dMon3 > 10) {
        showError(element.errorDiemMon3, 'Điểm môn 3 phải từ 0 đến 10');
        isValid = false;
    }

    if (!isValid) return;

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


    const resultWrapper = element.resultWrapper;
    const txtResult = element.txtResult;

    if (!resultWrapper || !txtResult) return;

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
