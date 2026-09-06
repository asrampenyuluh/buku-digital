import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const contentTypes = [
  { value: 'khutbah_jumat', label: 'Khutbah Jumat' },
  { value: 'khutbah_hari_raya', label: 'Khutbah Hari Raya' },
  { value: 'khutbah_nikah', label: 'Khutbah Nikah' },
  { value: 'amalan', label: 'Amalan' },
  { value: 'shalawat', label: 'Shalawat' },
  { value: 'talqin_mayit', label: 'Talqin Mayit' },
  { value: 'hadith_collection', label: 'Kumpulan Hadits' },
  { value: 'general', label: 'Umum' },
]

function ManuscriptsPage() {
  const [manuscripts, setManuscripts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingManuscript, setEditingManuscript] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    title_arabic: '',
    author: '',
    author_arabic: '',
    category: '',
    cover_url: '',
    content_type: 'general',
    description: '',
    tags: [],
    is_featured: false,
    is_published: true,
  })

  const fetchManuscripts = async () => {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false })
    if (data) setManuscripts(data)
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setCategories(data)
  }

  useEffect(() => {
    fetchManuscripts()
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingManuscript) {
      await supabase.from('books').update(formData).eq('id', editingManuscript.id)
    } else {
      await supabase.from('books').insert([formData])
    }
    setShowForm(false)
    setEditingManuscript(null)
    setFormData({
      title: '',
      title_arabic: '',
      author: '',
      author_arabic: '',
      category: categories[0]?.slug || '',
      cover_url: '',
      content_type: 'general',
      description: '',
      tags: [],
      is_featured: false,
      is_published: true,
    })
    fetchManuscripts()
  }

  const handleEdit = (manuscript) => {
    setEditingManuscript(manuscript)
    setFormData({
      title: manuscript.title,
      title_arabic: manuscript.title_arabic,
      author: manuscript.author,
      author_arabic: manuscript.author_arabic || '',
      category: manuscript.category,
      cover_url: manuscript.cover_url || '',
      content_type: manuscript.content_type || 'general',
      description: manuscript.description || '',
      tags: manuscript.tags || [],
      is_featured: manuscript.is_featured || false,
      is_published: manuscript.is_published ?? true,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus manuskrip ini?')) {
      await supabase.from('books').delete().eq('id', id)
      fetchManuscripts()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Manuskrip
        </h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingManuscript(null)
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Manuskrip
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingManuscript ? 'Edit Manuskrip' : 'Tambah Manuskrip Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Judul Indonesia
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Judul Arab
                </label>
                <input
                  type="text"
                  value={formData.title_arabic}
                  onChange={(e) => setFormData({ ...formData, title_arabic: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Pengarang
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Pengarang Arab
                </label>
                <input
                  type="text"
                  value={formData.author_arabic}
                  onChange={(e) => setFormData({ ...formData, author_arabic: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Tipe Konten
                </label>
                <select
                  value={formData.content_type}
                  onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  URL Cover
                </label>
                <input
                  type="text"
                  value={formData.cover_url}
                  onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
                  />
                  <span className="font-ui-caption text-ui-caption text-on-surface">Unggulan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
                  />
                  <span className="font-ui-caption text-ui-caption text-on-surface">Dipublikasikan</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingManuscript(null)
                }}
                className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-ui-label text-ui-label hover:bg-surface-container-high transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">Memuat...</div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-surface-container">
            <thead className="bg-surface-container">
              <tr>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Judul</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Pengarang</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Kategori</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Tipe</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {manuscripts.map((manuscript) => (
                <tr key={manuscript.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">{manuscript.title}</div>
                    {manuscript.title_arabic && (
                      <div className="font-arabic-body text-headline-sm text-secondary" dir="rtl">
                        {manuscript.title_arabic}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">{manuscript.author}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container font-ui-caption text-ui-caption text-on-surface-variant">
                      {manuscript.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container font-ui-caption text-ui-caption text-on-secondary-container">
                      {manuscript.content_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(manuscript)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(manuscript.id)}
                      className="font-ui-caption text-ui-caption text-error hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManuscriptsPage
