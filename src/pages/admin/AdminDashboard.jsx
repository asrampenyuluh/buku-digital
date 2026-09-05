import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

function AdminDashboard() {
  const [stats, setStats] = useState({
    books: 0,
    chapters: 0,
    hadiths: 0,
    downloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [booksRes, chaptersRes, hadithsRes, downloadsRes] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact', head: true }),
        supabase.from('chapters').select('*', { count: 'exact', head: true }),
        supabase.from('hadiths').select('*', { count: 'exact', head: true }),
        supabase.from('downloads').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        books: booksRes.count || 0,
        chapters: chaptersRes.count || 0,
        hadiths: hadithsRes.count || 0,
        downloads: downloadsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">Memuat...</div>;
  }

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-lg">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-space-lg">
        <Link
          to="/admin/books"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.books}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Kitab</div>
        </Link>
        <Link
          to="/admin/chapters"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.chapters}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Bab</div>
        </Link>
        <Link
          to="/admin/hadiths"
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.hadiths}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Hadits</div>
        </Link>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <div className="font-headline-sm text-headline-sm text-primary font-bold">{stats.downloads}</div>
          <div className="font-ui-caption text-ui-caption text-on-surface-variant">Unduhan</div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-space-md">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
          Selamat Datang di Admin Panel
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Gunakan menu di sebelah kiri untuk mengelola kitab, bab, dan hadits.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
