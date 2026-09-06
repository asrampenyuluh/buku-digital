import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function SectionsPage() {
  const [sections, setSections] = useState([])
  const [manuscripts, setManuscripts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [formData, setFormData] = useState({
    manuscript_id: '',
    section_number: 1,
    title: '',
    title_arabic: '',
    description: '',
  })

  const fetchData = async () => {
    const [sectionsRes, manuscriptsRes] = await Promise.all([
      supabase.from('chapters').select('*').order('created_at', { ascending: false }),
      supabase.from('books').select('id, title').order('title'),
    ])
    if (sectionsRes.data) setSections(sectionsRes.data)
    if (manuscriptsRes.data) setManuscripts(manuscriptsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingSection) {
      await supabase.from('chapters').update(formData).eq('id', editingSection.id)
    } else {
      await supabase.from('chapters').insert([formData])
    }
    setShowForm(false)
    setEditingSection(null)
    setFormData({
      manuscript_id: '',
      section_number: 1,
      title: '',
      title_arabic: '',
      description: '',
    })
    fetchData()
  }

  const handleEdit = (section) => {
    setEditingSection(section)
    setFormData({
      manuscript_id: section.manuscript_id,
      section_number: section.section_number,
      title: section.title,
      title_arabic: section.title_arabic || '',
      description: section.description || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus bagian ini?')) {
      await supabase.from('chapters').delete().eq('id', id)
      fetchData()
    }
  }

  const getManuscriptTitle = (manuscriptId) => {
    return manuscripts.find((m) => m.id === manuscriptId)?.title || 'Unknown'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Bagian
        </h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingSection(null)
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Bagian
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingSection ? 'Edit Bagian' : 'Tambah Bagian Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Manuskrip
                </label>
                <select
                  value={formData.manuscript_id}
                  onChange={(e) => setFormData({ ...formData, manuscript_id: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Pilih Manuskrip</option>
                  {manuscripts.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Nomor Bagian
                </label>
                <input
                  type="number"
                  value={formData.section_number}
                  onChange={(e) => setFormData({ ...formData, section_number: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
              </div>
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
                  setEditingSection(null)
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Bagian</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Manuskrip</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {sections.map((section) => (
                <tr key={section.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">
                      {section.section_number}. {section.title}
                    </div>
                    {section.title_arabic && (
                      <div className="font-arabic-body text-headline-sm text-secondary" dir="rtl">
                        {section.title_arabic}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {getManuscriptTitle(section.manuscript_id)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(section)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
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

export default SectionsPage
