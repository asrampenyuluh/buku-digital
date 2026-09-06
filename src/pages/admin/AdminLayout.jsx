import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminLayout() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-surface-container-low shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="font-headline-sm text-headline-sm text-primary font-bold">
                Panel Admin
              </h1>
              <span className="font-ui-caption text-ui-caption text-on-surface-variant">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="font-ui-caption text-ui-caption text-error hover:text-on-error-container transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-surface-container-low min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/manuscripts"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`
              }
            >
              Kelola Manuskrip
            </NavLink>
            <NavLink
              to="/admin/sections"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`
              }
            >
              Kelola Bagian
            </NavLink>
            <NavLink
              to="/admin/readings"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`
              }
            >
              Kelola Bacaan
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`
              }
            >
              Kelola Kategori
            </NavLink>
            <div className="pt-2 border-t border-surface-container">
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg font-ui-label text-ui-label transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`
                }
              >
                Pengaturan Profil
              </NavLink>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
