import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminDashboard() {
  const [stats, setStats] = useState({
    manuscripts: 0,
    sections: 0,
    readings: 0,
    downloads: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const [manuscriptsRes, sectionsRes, readingsRes, downloadsRes] = await Promise.all([
        supabase.from('manuscripts').select('*', { count: 'exact', head: true }),
        supabase.from('sections').select('*', { count: 'exact', head: true }),
        supabase.from('readings').select('*', { count: 'exact', head: true }),
        supabase.from('downloads').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        manuscripts: manuscriptsRes.count || 0,
        sections: sectionsRes.count || 0,
        readings: readingsRes.count || 0,
        downloads: downloadsRes.count || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">Memuat...</div>
  }

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-lg">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-space-lg">
        <Link
          to="/admin/manuscripts"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.manuscripts}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Manuskrip</div>
        </Link>
        <Link
          to="/admin/sections"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.sections}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Bagian</div>
        </Link>
        <Link
          to="/admin/readings"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.readings}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Bacaan</div>
        </Link>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.downloads}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Unduhan</div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-space-md">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
          Selamat Datang di Panel Admin
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Gunakan menu di sebelah kiri untuk mengelola manuskrip, bagian, dan bacaan Islam.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard
