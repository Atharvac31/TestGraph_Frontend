import { useEffect } from 'react'
import { NavList, SidebarBrand, SidebarFooter } from './Sidebar.jsx'

function MobileDrawer({ open, onClose }) {
  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      className={`md:hidden fixed inset-0 z-30 transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className={`absolute inset-y-0 left-0 w-72 max-w-[80%] bg-surface-raised border-r border-surface-border flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pr-2">
          <SidebarBrand />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-md text-ink-faint hover:text-ink hover:bg-white/5"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <NavList onNavigate={onClose} />
        <SidebarFooter />
      </aside>
    </div>
  )
}

export default MobileDrawer