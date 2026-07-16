import { useEffect, useState } from 'react'
import { AuthPage } from './features/auth/pages/AuthPage'
import { AdminDashboard } from './features/dashboard/AdminDashboard'
import { CustomerDashboard } from './features/dashboard/CustomerDashboard'
import { AppShell } from './layouts/AppShell'
import { getRoute, navigate } from './routes/router'
import './App.css'

function App() {
  const [route, setRoute] = useState(getRoute)
  const [authenticated, setAuthenticated] = useState(true)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const signOut = () => {
    setAuthenticated(false)
    navigate('login')
  }

  if (!authenticated || route.section === 'login') {
    return <AuthPage onLogin={(role) => { setAuthenticated(true); navigate(role) }} />
  }

  return (
    <AppShell role={route.role} page={route.page} onNavigate={navigate} onSignOut={signOut}>
      {route.role === 'admin'
        ? <AdminDashboard page={route.page} onNavigate={navigate} />
        : <CustomerDashboard page={route.page} onNavigate={navigate} />}
    </AppShell>
  )
}

export default App
