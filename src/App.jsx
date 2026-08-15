import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import RequirementsListPage from './pages/RequirementsListPage.jsx'
import RequirementDetailPage from './pages/RequirementDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/requirements" element={<RequirementsListPage />} />
        <Route path="/requirements/:requirementId" element={<RequirementDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App