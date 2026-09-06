import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import DetailPage from './pages/DetailPage'
import CatalogPage from './pages/CatalogPage'
import DownloadsPage from './pages/DownloadsPage'
import ReaderPage from './pages/ReaderPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManuscriptsPage from './pages/admin/ManuscriptsPage'
import SectionsPage from './pages/admin/SectionsPage'
import ReadingsPage from './pages/admin/ReadingsPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import ProfileSettingsPage from './pages/admin/ProfileSettingsPage'
import LoginPage from './pages/admin/LoginPage'
import RegisterPage from './pages/admin/RegisterPage'
import AdminRoute from './components/admin/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/manuskrip/:id" element={<DetailPage />} />
          <Route path="/unduhan" element={<DownloadsPage />} />
          <Route path="/terakhir" element={<CatalogPage />} />
          <Route path="/pengaturan" element={<CatalogPage />} />
          <Route path="/baca/:id" element={<ReaderPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="manuscripts" element={<ManuscriptsPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="readings" element={<ReadingsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="profile" element={<ProfileSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
