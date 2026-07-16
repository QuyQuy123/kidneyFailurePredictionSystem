import { useState } from 'react'
import { Button } from '../../../components/UI'
import { Icon } from '../../../components/Icon'

export function AuthPage({ onLogin }) {
  const [role, setRole] = useState('customer')
  return <main className="auth-page">
    <section className="auth-copy">
      <div className="brand brand--static"><span className="brand__mark"><Icon name="kidney" size={28}/></span><span>NephroSense</span></div>
      <div><h1>Hiểu rõ nguy cơ.<br/>Chủ động bảo vệ thận.</h1><p>Nền tảng hỗ trợ theo dõi chỉ số và ước tính nguy cơ suy thận từ dữ liệu sức khỏe của bạn.</p></div>
      <small>Thông tin chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ.</small>
    </section>
    <section className="auth-card">
      <div><h2>Đăng nhập</h2><p>Chào mừng bạn quay lại NephroSense.</p></div>
      <div className="role-tabs"><button className={role === 'customer' ? 'active' : ''} onClick={() => setRole('customer')}>Khách hàng</button><button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>Quản trị viên</button></div>
      <label className="field"><span>Email</span><input defaultValue={role === 'admin' ? 'admin@nephrosense.vn' : 'minh.nguyen@email.com'} /></label>
      <label className="field"><span>Mật khẩu</span><input type="password" defaultValue="nephrosense" /></label>
      <div className="form-row"><label className="checkbox"><input type="checkbox" defaultChecked/> Ghi nhớ đăng nhập</label><button className="text-button">Quên mật khẩu?</button></div>
      <Button onClick={() => onLogin(role)}>Đăng nhập</Button>
      <p className="auth-note">Giao diện demo — không kết nối backend.</p>
    </section>
  </main>
}
