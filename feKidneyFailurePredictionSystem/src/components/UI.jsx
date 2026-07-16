import { Icon } from './Icon'

export function Button({ children, variant = 'primary', icon, ...props }) {
  return <button className={`button button--${variant}`} type="button" {...props}>{icon ? <Icon name={icon} size={17} /> : null}<span>{children}</span></button>
}

export function Panel({ children, className = '', title, action }) {
  return <section className={`panel ${className}`}><div className="panel__head">{title ? <h2>{title}</h2> : <span />}{action}</div>{children}</section>
}

export function Status({ level = 'low', children }) {
  return <span className={`status status--${level}`}><i />{children}</span>
}

export function EmptyState({ icon = 'history', title, children }) {
  return <div className="empty-state"><div className="empty-state__icon"><Icon name={icon} /></div><h3>{title}</h3><p>{children}</p></div>
}
