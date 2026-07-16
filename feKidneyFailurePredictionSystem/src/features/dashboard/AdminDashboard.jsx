import { useMemo, useState } from 'react'
import { Button, Panel, Status } from '../../components/UI'
import { BarsChart, RiskDonut } from './Charts'
import { logs, predictionRows, users } from './data'
import { PageHeader } from './CustomerDashboard'

function AdminOverview({ onNavigate }) {
  return <div className="page"><PageHeader title="Tổng quan hệ thống" description="Theo dõi hoạt động hệ thống và hiệu suất mô hình." action={<select className="select"><option>7 ngày qua</option><option>30 ngày qua</option></select>}/>
    <div className="kpis"><Kpi label="Tổng người dùng" value="2.345" delta="12.4%"/><Kpi label="Tổng số dự đoán" value="18.726" delta="15.7%"/><Kpi label="Trường hợp nguy cơ cao" value="432" delta="8.3%"/><Kpi label="Độ chính xác mô hình" value="86.7%" delta="2.1%"/></div>
    <div className="admin-charts"><Panel title="Dự đoán theo tuần"><BarsChart/></Panel><Panel title="Phân bố mức nguy cơ"><RiskDonut/></Panel></div>
    <AdminPredictionTable rows={predictionRows} onNavigate={onNavigate}/>
  </div>
}

function UsersPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => users.filter(user => user.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="page"><PageHeader title="Quản lý người dùng" description="Xem và quản lý tài khoản sử dụng hệ thống." action={<Button>Thêm người dùng</Button>}/><Panel className="table-panel" title={`${filtered.length} người dùng`} action={<input className="compact-input" placeholder="Tìm theo tên hoặc email..." value={query} onChange={event => setQuery(event.target.value)}/>}><div className="table-scroll"><table><thead><tr><th>Người dùng</th><th>Email</th><th>Lần hoạt động cuối</th><th>Trạng thái</th><th></th></tr></thead><tbody>{filtered.map(user => <tr key={user[1]}><td><div className="user-cell"><span>{user[0].split(' ').slice(-2).map(word => word[0]).join('')}</span><strong>{user[0]}</strong></div></td><td>{user[1]}</td><td>{user[2]}</td><td><Status level={user[3] === 'Cần xem xét' ? 'medium' : 'low'}>{user[3]}</Status></td><td><button className="table-link">Chi tiết</button></td></tr>)}</tbody></table></div></Panel></div>
}

function PredictionsPage() { return <div className="page"><PageHeader title="Quản lý dự đoán" description="Tra cứu và kiểm tra các kết quả phân tích trên hệ thống."/><AdminPredictionTable rows={predictionRows}/></div> }

function ModelPage() {
  const [threshold, setThreshold] = useState(70)
  return <div className="page"><PageHeader title="Mô hình dự đoán" description="Theo dõi phiên bản, hiệu suất và cấu hình mô hình đang hoạt động." action={<Button>Xuất báo cáo</Button>}/><div className="model-grid"><Panel title="Phiên bản đang hoạt động"><div className="model-version"><span>v2.4.1</span><Status>Đang hoạt động</Status></div><dl><div><dt>Triển khai</dt><dd>12/05/2026</dd></div><div><dt>Thuật toán</dt><dd>Gradient Boosting</dd></div><div><dt>Tập dữ liệu</dt><dd>24.682 bản ghi</dd></div><div><dt>Lần kiểm tra cuối</dt><dd>18/05/2026, 07:55</dd></div></dl></Panel><Panel title="Chỉ số hiệu suất"><div className="performance"><Score label="Accuracy" value="86.7%"/><Score label="Precision" value="84.2%"/><Score label="Recall" value="88.9%"/><Score label="F1 Score" value="86.5%"/></div></Panel><Panel title="Ngưỡng cảnh báo" className="span-2"><div className="threshold"><div><strong>{threshold}/100</strong><p>Điểm từ ngưỡng này sẽ được đánh dấu nguy cơ cao.</p></div><input type="range" min="50" max="90" value={threshold} onChange={event => setThreshold(event.target.value)}/></div><div className="panel-actions"><Button>Lưu cấu hình</Button></div></Panel></div></div>
}

function LogsPage() { return <div className="page"><PageHeader title="Nhật ký hệ thống" description="Theo dõi các sự kiện vận hành và hoạt động quan trọng." action={<Button variant="secondary">Tải xuống CSV</Button>}/><Panel className="table-panel" title="Sự kiện hôm nay"><div className="table-scroll"><table><thead><tr><th>Thời gian</th><th>Sự kiện</th><th>Đối tượng</th><th>Chi tiết</th></tr></thead><tbody>{logs.map(log => <tr key={log[0]}><td className="mono">{log[0]}</td><td><span className="event-code">{log[1]}</span></td><td>{log[2]}</td><td>{log[3]}</td></tr>)}</tbody></table></div></Panel></div> }

export function AdminDashboard({ page, onNavigate }) {
  if (page === 'users') return <UsersPage/>
  if (page === 'predictions') return <PredictionsPage/>
  if (page === 'model') return <ModelPage/>
  if (page === 'logs') return <LogsPage/>
  return <AdminOverview onNavigate={onNavigate}/>
}

function Kpi({label,value,delta}) { return <article className="kpi"><span>{label}</span><strong>{value}</strong><p>↑ {delta} <small>so với tuần trước</small></p></article> }
function Score({label,value}) { return <div className="score"><span>{label}</span><strong>{value}</strong><i><b style={{width:value}}/></i></div> }
function AdminPredictionTable({rows}) { return <Panel className="table-panel" title="Dự đoán gần đây"><div className="table-scroll"><table><thead><tr><th>Thời gian</th><th>ID dự đoán</th><th>Người dùng</th><th>Điểm</th><th>Mức nguy cơ</th><th>Trạng thái</th><th></th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td>{row.date}</td><td className="mono">{row.id}</td><td>{row.user}</td><td className="mono">{row.score}/100</td><td><Status level={row.level}>{row.label}</Status></td><td><Status>Hoàn tất</Status></td><td><button className="table-link">Xem chi tiết</button></td></tr>)}</tbody></table></div></Panel> }
