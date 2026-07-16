const CUSTOMER_PAGES = new Set(['overview', 'prediction', 'history', 'profile'])
const ADMIN_PAGES = new Set(['overview', 'users', 'predictions', 'model', 'logs'])

export function getRoute() {
  const raw = window.location.hash.replace('#/', '') || 'customer/overview'
  if (raw === 'login') return { section: 'login', role: 'customer', page: 'overview' }
  const [requestedRole, requestedPage] = raw.split('/')
  const role = requestedRole === 'admin' ? 'admin' : 'customer'
  const pages = role === 'admin' ? ADMIN_PAGES : CUSTOMER_PAGES
  return { section: 'app', role, page: pages.has(requestedPage) ? requestedPage : 'overview' }
}

export function navigate(target) {
  if (target === 'customer' || target === 'admin') window.location.hash = `#/${target}/overview`
  else if (target === 'login') window.location.hash = '#/login'
  else window.location.hash = `#/${target}`
}
