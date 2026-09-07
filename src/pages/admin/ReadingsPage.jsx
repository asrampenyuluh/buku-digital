import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function ReadingsPage() {
  const [readings, setReadings] = useState([])
  const [books, setBooks] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingReading, setEditingReading] = useState(null)
  const [formData, setFormData] = useState({
    book_id: '',
    chapter_id: '',
    hadith_number: 1,
    narrator: '',
    matan_arabic: '',
    transliteration: '',
    matan_translation: '',
    notes: '',
    grade: '',
    source: '',
  })

  const fetchData = async () => {
    const [readingsRes, booksRes, sectionsRes] = await Promise.all([
      supabase.from('hadiths').select('*').order('created_at', { ascending: false }),
      supabase.from('books').select('id, title').order('title'),
      supabase.from('chapters').select('id, title, book_id').order('chapter_number'),
    ])
    if (readingsRes.data) setReadings(readingsRes.data)
    if (booksRes.data) setBooks(booksRes.data)
    if (sectionsRes.data) setSections(sectionsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleBookChange = (bookId) => {
    setFormData({ ...formData, book_id: bookId, chapter_id: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingReading) {
      await supabase.from('hadiths').update(formData).eq('id', editingReading.id)
    } else {
      await supabase.from('hadiths').insert([formData])
    }
    setShowForm(false)
    setEditingReading(null)
    setFormData({
      book_id: '',
      chapter_id: '',
      hadith_number: 1,
      narrator: '',
      matan_arabic: '',
      transliteration: '',
      matan_translation: '',
      notes: '',
      grade: '',
      source: '',
    })
    fetchData()
  }

  const handleEdit = (reading) => {
    setEditingReading(reading)
    setFormData({
      book_id: reading.book_id,
      chapter_id: reading.chapter_id || '',
      hadith_number: reading.hadith_number,
      narrator: reading.narrator || '',
      matan_arabic: reading.matan_arabic || '',
      transliteration: reading.transliteration || '',
      matan_translation: reading.matan_translation || '',
      notes: reading.notes || '',
      grade: reading.grade || '',
      source: reading.source || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus bacaan ini?')) {
      await supabase.from('hadiths').delete().eq('id', id)
      fetchData()
    }
  }

  const getBookTitle = (bookId) => {
    return books.find((b) => b.id === bookId)?.title || 'Unknown'
  }

  const getChapterTitle = (chapterId) => {
    return sections.find((s) => s.id === chapterId)?.title || 'Unknown'
  }

  const filteredChapters = sections.filter((s) => s.book_id === formData.book_id)

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
                  value={formData.book_id}
                  onChange={(e) => handleBookChange(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Pilih Kitab</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Bagian
                </label>
                  <select
                    value={formData.chapter_id}
                    onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Pilih Bab (Opsional)</option>
                    {filteredChapters.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                    ))}
                  </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Nomor Bacaan
                </label>
                  <input
                    type="number"
                    value={formData.hadith_number}
                    onChange={(e) => setFormData({ ...formData, hadith_number: parseInt(e.target.value) || 1 })}
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
                    value={formData.narrator}
                    onChange={(e) => setFormData({ ...formData, narrator: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Teks Arab
                </label>
                <textarea
                  value={formData.matan_arabic}
                  onChange={(e) => setFormData({ ...formData, matan_arabic: e.target.value })}
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
                  value={formData.matan_translation}
                  onChange={(e) => setFormData({ ...formData, matan_translation: e.target.value })}
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
                      No. {reading.hadith_number}
                    </div>
                    <div className="font-arabic-body text-headline-sm text-secondary truncate max-w-md" dir="rtl">
                      {reading.matan_arabic}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {getBookTitle(reading.book_id)}
                    </div>
                    <div className="font-ui-caption text-ui-caption text-on-surface-variant">
                      {getChapterTitle(reading.chapter_id)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {reading.narrator || '-'}
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
