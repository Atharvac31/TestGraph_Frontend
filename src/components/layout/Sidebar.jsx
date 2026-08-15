import { NavLink } from 'react-router-dom'
import Logomark from '../Logomark.jsx'
import { navItems } from './navItems.jsx'

function NavList({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent/15 text-white'
                : 'text-ink-muted hover:text-ink hover:bg-white/5',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className={`h-4 w-4 ${isActive ? 'text-accent' : 'text-ink-faint group-hover:text-ink-muted'}`} />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2.5 px-5 h-16 border-b border-surface-border">
      <Logomark className="h-6 w-6 text-accent" />
      <div className="leading-tight">
        <p className="text-sm font-semibold text-ink tracking-tight">TestGraph</p>
        <p className="text-[11px] text-ink-faint font-mono">e-commerce · v1</p>
      </div>
    </div>
  )
}

function SidebarFooter() {
  return (
    <div className="px-3 pb-4">
      <div className="rounded-md border border-surface-border bg-surface/60 px-3 py-2.5">
        <p className="text-[11px] uppercase tracking-wide text-ink-faint">Use case</p>
        <p className="mt-1 text-xs text-ink-muted leading-relaxed">
          Requirement traceability & impact analysis, backed by CognoDB.
        </p>
      </div>
    </div>
  )
}

// Fixed desktop sidebar. Mobile uses the same building blocks inside MobileDrawer.
function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-surface-border bg-surface-raised/60">
      <SidebarBrand />
      <NavList />
      <SidebarFooter />
    </aside>
  )
}

export { NavList, SidebarBrand, SidebarFooter }
export default Sidebar