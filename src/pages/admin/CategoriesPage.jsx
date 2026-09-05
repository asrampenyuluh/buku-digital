import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    sort_order: 0,
  })

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingCategory) {
      await supabase.from('categories').update(formData).eq('id', editingCategory.id)
    } else {
      await supabase.from('categories').insert([formData])
    }
    setShowForm(false)
    setEditingCategory(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      sort_order: 0,
    })
    fetchCategories()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      sort_order: category.sort_order || 0,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus kategori ini?')) {
      await supabase.from('categories').delete().eq('id', id)
      fetchCategories()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Kategori
        </h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingCategory(null)
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Kategori
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
                <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-1">
                  Gunakan huruf kecil tanpa spasi, contoh: fiqih
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={2}
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Urutan Tampil
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                />
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
                  setEditingCategory(null)
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Nama</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Slug</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Deskripsi</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface font-medium">
                    {category.name}
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-ui-caption text-ui-caption bg-surface-container px-2 py-0.5 rounded">
                      {category.slug}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {category.description || '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(category)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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

export default CategoriesPage
