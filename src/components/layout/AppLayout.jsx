import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import MobileDrawer from './MobileDrawer.jsx'
import Topbar from './Topbar.jsx'

function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <MobileDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="md:pl-60">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="px-4 md:px-8 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout