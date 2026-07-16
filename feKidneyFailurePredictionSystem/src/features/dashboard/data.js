export const predictionRows = [
  { date: '18/05/2026 08:15', id: 'P-20260518-0001', user: 'Nguyễn Văn Minh', score: 18, level: 'low', label: 'Nguy cơ thấp', egfr: 82, creatinine: '1.02', pressure: '118/76' },
  { date: '11/05/2026 08:10', id: 'P-20260511-0002', user: 'Trần Thị Lan', score: 46, level: 'medium', label: 'Nguy cơ trung bình', egfr: 68, creatinine: '1.24', pressure: '126/80' },
  { date: '04/05/2026 08:05', id: 'P-20260504-0003', user: 'Lê Hoàng Nam', score: 76, level: 'high', label: 'Nguy cơ cao', egfr: 52, creatinine: '1.62', pressure: '142/88' },
  { date: '27/04/2026 08:00', id: 'P-20260427-0004', user: 'Phạm Thị Hòa', score: 23, level: 'low', label: 'Nguy cơ thấp', egfr: 79, creatinine: '1.08', pressure: '120/78' },
  { date: '20/04/2026 07:55', id: 'P-20260420-0005', user: 'Hoàng Quốc Trung', score: 55, level: 'medium', label: 'Nguy cơ trung bình', egfr: 64, creatinine: '1.31', pressure: '130/82' },
]

export const users = [
  ['Nguyễn Văn Minh', 'minh.nguyen@email.com', '18/05/2026', 'Đang hoạt động'],
  ['Trần Thị Lan', 'lan.tran@email.com', '18/05/2026', 'Đang hoạt động'],
  ['Lê Hoàng Nam', 'nam.le@email.com', '17/05/2026', 'Cần xem xét'],
  ['Phạm Thị Hòa', 'hoa.pham@email.com', '16/05/2026', 'Đang hoạt động'],
  ['Hoàng Quốc Trung', 'trung.hoang@email.com', '15/05/2026', 'Đang hoạt động'],
]

export const logs = [
  ['08:15:32', 'PREDICTION_CREATED', 'minh.nguyen@email.com', 'Tạo dự đoán P-20260518-0001'],
  ['08:12:09', 'USER_LOGIN', 'lan.tran@email.com', 'Đăng nhập thành công'],
  ['07:55:41', 'MODEL_CHECK', 'system', 'Kiểm tra mô hình v2.4.1 hoàn tất'],
  ['07:30:00', 'DATA_SYNC', 'system', 'Đồng bộ dữ liệu chỉ số hoàn tất'],
]
