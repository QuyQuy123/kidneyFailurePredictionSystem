import { useState } from 'react'
import { Button, Panel, Status } from '../../components/UI'
import { Icon } from '../../components/Icon'
import { TrendChart } from './Charts'
import { predictionRows } from './data'

const fields = [
  ['age', 'Tuổi', '34', 'tuổi'], ['bloodPressure', 'Huyết áp', '118', 'mmHg'],
  ['specificGravity', 'Tỷ trọng nước tiểu', '1.020', ''], ['albumin', 'Albumin', '0', 'g/L'],
  ['sugar', 'Đường huyết', '96', 'mg/dL'], ['creatinine', 'Creatinine', '1.02', 'mg/dL'],
  ['hemoglobin', 'Hemoglobin', '14.2', 'g/dL'], ['egfr', 'eGFR', '82', 'mL/phút/1.73m²'],
]

function Overview({ onNavigate }) {
  return <div className="page"><PageHeader title="Chào buổi sáng, Minh" description="Theo dõi sức khỏe thận và xu hướng nguy cơ của bạn." action={<Button icon="plus" onClick={() => onNavigate('customer/prediction')}>Tạo dự đoán mới</Button>} />
    <div className="overview-grid">
      <Panel className="risk-panel" title="Tổng quan nguy cơ"><Status>Nguy cơ thấp</Status><div className="risk-score"><strong>18</strong><span>/100</span></div><div className="risk-meter"><i style={{width:'18%'}}/></div><div className="risk-labels"><span>0</span><span>Thấp</span><span>Trung bình</span><span>Cao</span><span>100</span></div><p className="disclaimer">Kết quả hỗ trợ sàng lọc, không phải chẩn đoán y khoa.</p></Panel>
      <Panel title="Xu hướng điểm nguy cơ" action={<select className="select"><option>30 ngày qua</option><option>90 ngày qua</option></select>}><TrendChart /></Panel>
    </div>
    <Panel title="Chỉ số sức khỏe mới nhất" className="metrics-panel"><div className="metrics"><Metric label="eGFR" value="82" unit="mL/phút/1.73m²" trend="+4.1%"/><Metric label="Creatinine" value="1.02" unit="mg/dL" trend="-5.6%"/><Metric label="Huyết áp" value="118/76" unit="mmHg" trend="Ổn định"/></div></Panel>
    <PredictionTable title="Lịch sử dự đoán gần đây" rows={predictionRows.slice(0, 4)} onNavigate={onNavigate} />
  </div>
}

function PredictionForm({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false)
  return <div className="page page--narrow"><PageHeader title="Tạo dự đoán mới" description="Điền các chỉ số xét nghiệm gần nhất để ước tính nguy cơ." />
    {submitted ? <Panel className="result-panel"><div className="result-icon"><Icon name="check" size={28}/></div><h2>Đã hoàn tất phân tích</h2><p>Kết quả ước tính của bạn là <strong>18/100 — Nguy cơ thấp</strong>.</p><div className="result-actions"><Button onClick={() => onNavigate('customer/overview')}>Về tổng quan</Button><Button variant="secondary" onClick={() => setSubmitted(false)}>Tạo dự đoán khác</Button></div></Panel>
    : <form className="prediction-form" onSubmit={(event) => {event.preventDefault(); setSubmitted(true)}}><Panel title="Thông tin sức khỏe"><div className="form-grid">{fields.map(([name,label,value,unit]) => <label className="field" key={name}><span>{label}</span><div className="input-unit"><input name={name} defaultValue={value} inputMode="decimal"/><em>{unit}</em></div></label>)}</div></Panel><Panel title="Thông tin bổ sung"><div className="form-grid"><label className="field"><span>Tăng huyết áp</span><select><option>Không</option><option>Có</option></select></label><label className="field"><span>Đái tháo đường</span><select><option>Không</option><option>Có</option></select></label><label className="field"><span>Phù chân</span><select><option>Không</option><option>Có</option></select></label><label className="field"><span>Tiền sử gia đình</span><select><option>Không</option><option>Có</option></select></label></div></Panel><div className="form-submit"><p><Icon name="shield" size={17}/> Dữ liệu của bạn được bảo vệ và chỉ dùng cho mục đích phân tích.</p><Button type="submit" icon="arrow">Phân tích nguy cơ</Button></div></form>}
  </div>
}

function Profile() {
  return <div className="page page--narrow"><PageHeader title="Hồ sơ cá nhân" description="Quản lý thông tin và tùy chọn tài khoản của bạn."/><div className="profile-layout"><Panel><div className="profile-summary"><div className="profile-avatar">MN</div><h2>Nguyễn Văn Minh</h2><p>minh.nguyen@email.com</p><Status>Tài khoản đã xác minh</Status></div></Panel><Panel title="Thông tin cá nhân"><div className="form-grid"><label className="field"><span>Họ và tên</span><input defaultValue="Nguyễn Văn Minh"/></label><label className="field"><span>Ngày sinh</span><input type="date" defaultValue="1992-08-14"/></label><label className="field"><span>Số điện thoại</span><input defaultValue="0912 345 678"/></label><label className="field"><span>Giới tính</span><select><option>Nam</option><option>Nữ</option></select></label></div><div className="panel-actions"><Button>Lưu thay đổi</Button></div></Panel></div></div>
}

export function CustomerDashboard({ page, onNavigate }) {
  if (page === 'prediction') return <PredictionForm onNavigate={onNavigate}/>
  if (page === 'history') return <div className="page"><PageHeader title="Lịch sử dự đoán" description="Theo dõi sự thay đổi của các chỉ số và kết quả đã thực hiện."/><PredictionTable rows={predictionRows} onNavigate={onNavigate}/></div>
  if (page === 'profile') return <Profile />
  return <Overview onNavigate={onNavigate}/>
}

export function PageHeader({ title, description, action }) { return <header className="page-header"><div><h1>{title}</h1><p>{description}</p></div>{action}</header> }
function Metric({label,value,unit,trend}) { return <article className="metric"><div><span>{label}</span><Icon name="prediction" size={15}/></div><strong>{value}</strong><small>{unit}</small><p>{trend} · Bình thường</p></article> }
export function PredictionTable({title,rows,onNavigate}) { return <Panel title={title} className="table-panel"><div className="table-scroll"><table><thead><tr><th>Ngày dự đoán</th><th>Điểm nguy cơ</th><th>Mức nguy cơ</th><th>eGFR</th><th>Creatinine</th><th>Huyết áp</th><th></th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td>{row.date}</td><td className="mono">{row.score}/100</td><td><Status level={row.level}>{row.label}</Status></td><td>{row.egfr}</td><td>{row.creatinine}</td><td>{row.pressure}</td><td><button className="table-link" onClick={() => onNavigate('customer/prediction')}>Xem chi tiết</button></td></tr>)}</tbody></table></div></Panel> }
