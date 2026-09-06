import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function ReadingsPage() {
  const [readings, setReadings] = useState([])
  const [manuscripts, setManuscripts] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingReading, setEditingReading] = useState(null)
  const [formData, setFormData] = useState({
    manuscript_id: '',
    section_id: '',
    reading_number: 1,
    speaker_narrator: '',
    arabic_text: '',
    transliteration: '',
    translation: '',
    notes: '',
    grade: '',
    source: '',
  })

  const fetchData = async () => {
    const [readingsRes, manuscriptsRes, sectionsRes] = await Promise.all([
      supabase.from('readings').select('*').order('created_at', { ascending: false }),
      supabase.from('manuscripts').select('id, title').order('title'),
      supabase.from('sections').select('id, title, manuscript_id').order('section_number'),
    ])
    if (readingsRes.data) setReadings(readingsRes.data)
    if (manuscriptsRes.data) setManuscripts(manuscriptsRes.data)
    if (sectionsRes.data) setSections(sectionsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleManuscriptChange = (manuscriptId) => {
    setFormData({ ...formData, manuscript_id: manuscriptId, section_id: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingReading) {
      await supabase.from('readings').update(formData).eq('id', editingReading.id)
    } else {
      await supabase.from('readings').insert([formData])
    }
    setShowForm(false)
    setEditingReading(null)
    setFormData({
      manuscript_id: '',
      section_id: '',
      reading_number: 1,
      speaker_narrator: '',
      arabic_text: '',
      transliteration: '',
      translation: '',
      notes: '',
      grade: '',
      source: '',
    })
    fetchData()
  }

  const handleEdit = (reading) => {
    setEditingReading(reading)
    setFormData({
      manuscript_id: reading.manuscript_id,
      section_id: reading.section_id || '',
      reading_number: reading.reading_number,
      speaker_narrator: reading.speaker_narrator || '',
      arabic_text: reading.arabic_text || '',
      transliteration: reading.transliteration || '',
      translation: reading.translation || '',
      notes: reading.notes || '',
      grade: reading.grade || '',
      source: reading.source || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus bacaan ini?')) {
      await supabase.from('readings').delete().eq('id', id)
      fetchData()
    }
  }

  const getManuscriptTitle = (manuscriptId) => {
    return manuscripts.find((m) => m.id === manuscriptId)?.title || 'Unknown'
  }

  const getSectionTitle = (sectionId) => {
    return sections.find((s) => s.id === sectionId)?.title || 'Unknown'
  }

  const filteredSections = sections.filter((s) => s.manuscript_id === formData.manuscript_id)

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Bacaan
        </h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingReading(null)
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Bacaan
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingReading ? 'Edit Bacaan' : 'Tambah Bacaan Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Manuskrip
                </label>
                <select
                  value={formData.manuscript_id}
                  onChange={(e) => handleManuscriptChange(e.target.value)}
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
                  Bagian
                </label>
                <select
                  value={formData.section_id}
                  onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                >
                  <option value="">Pilih Bagian (Opsional)</option>
                  {filteredSections.map((section) => (
                    <option key={section.id} value={section.id}>{section.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Nomor Bacaan
                </label>
                <input
                  type="number"
                  value={formData.reading_number}
                  onChange={(e) => setFormData({ ...formData, reading_number: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Pembicara / Perawi
                </label>
                <input
                  type="text"
                  value={formData.speaker_narrator}
                  onChange={(e) => setFormData({ ...formData, speaker_narrator: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Teks Arab
                </label>
                <textarea
                  value={formData.arabic_text}
                  onChange={(e) => setFormData({ ...formData, arabic_text: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={3}
                  dir="rtl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Transliterasi
                </label>
                <textarea
                  value={formData.transliteration}
                  onChange={(e) => setFormData({ ...formData, transliteration: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Terjemahan
                </label>
                <textarea
                  value={formData.translation}
                  onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={2}
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Derajat
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Sumber
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
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
                  setEditingReading(null)
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Bacaan</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Manuskrip/Bagian</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Pembicara</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Derajat</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {readings.map((reading) => (
                <tr key={reading.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">
                      No. {reading.reading_number}
                    </div>
                    <div className="font-arabic-body text-headline-sm text-secondary truncate max-w-md" dir="rtl">
                      {reading.arabic_text}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {getManuscriptTitle(reading.manuscript_id)}
                    </div>
                    <div className="font-ui-caption text-ui-caption text-on-surface-variant">
                      {getSectionTitle(reading.section_id)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {reading.speaker_narrator || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container font-ui-caption text-ui-caption text-on-surface-variant">
                      {reading.grade || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(reading)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reading.id)}
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

export default ReadingsPage
