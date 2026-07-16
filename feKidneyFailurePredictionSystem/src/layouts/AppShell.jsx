import { useState } from 'react'
import { Icon } from '../components/Icon'

const customerNav = [
  ['overview', 'Tổng quan', 'overview'], ['prediction', 'Dự đoán', 'prediction'],
  ['history', 'Lịch sử', 'history'], ['profile', 'Hồ sơ', 'profile'],
]
const adminNav = [
  ['overview', 'Tổng quan', 'overview'], ['users', 'Người dùng', 'users'],
  ['predictions', 'Dự đoán', 'prediction'], ['model', 'Mô hình', 'model'], ['logs', 'Nhật ký', 'logs'],
]

export function AppShell({ role, page, onNavigate, onSignOut, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = role === 'admin' ? adminNav : customerNav
  const go = (target) => { onNavigate(`${role}/${target}`); setMobileOpen(false) }

  return <div className={`app-shell app-shell--${role}`}>
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Icon name="menu" /></button>
      <button className="brand" onClick={() => go('overview')}><span className="brand__mark"><Icon name="kidney" size={25} strokeWidth={1.9} /></span><span>NephroSense</span></button>
      <div className="topbar__tools">
        {role === 'admin' ? <label className="search"><Icon name="search" size={17}/><input placeholder="Tìm kiếm..." /><kbd>⌘ K</kbd></label> : null}
        <button className="icon-button" aria-label="Thông báo"><Icon name="bell" size={18}/><i className="notification-dot" /></button>
        <button className="avatar" aria-label="Tài khoản">{role === 'admin' ? 'A' : 'M'}</button>
        <div className="identity"><strong>{role === 'admin' ? 'Admin' : 'Minh Nguyễn'}</strong><span>{role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span></div>
      </div>
    </header>
    {mobileOpen ? <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" /> : null}
    <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__mobile-head"><span>Điều hướng</span><button className="icon-button" onClick={() => setMobileOpen(false)}><Icon name="close" /></button></div>
      <nav>{nav.map(([key, label, icon]) => <button key={key} className={page === key ? 'active' : ''} onClick={() => go(key)}><Icon name={icon} size={18}/><span>{label}</span></button>)}</nav>
      <div className="sidebar__bottom">
        <button onClick={() => go(role === 'admin' ? 'model' : 'profile')}><Icon name="settings" size={18}/><span>Cài đặt</span></button>
        <button onClick={onSignOut}><Icon name="logout" size={18}/><span>Đăng xuất</span></button>
      </div>
      <button className="role-switch" onClick={() => onNavigate(role === 'admin' ? 'customer' : 'admin')}>Chuyển sang {role === 'admin' ? 'khách hàng' : 'quản trị'}</button>
    </aside>
    <main className="app-main">{children}</main>
  </div>
}
