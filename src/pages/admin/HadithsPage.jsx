import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function HadithsPage() {
  const [hadiths, setHadiths] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHadith, setEditingHadith] = useState(null);
  const [formData, setFormData] = useState({
    book_id: '',
    chapter_id: '',
    hadith_number: 1,
    narrator: '',
    matan_arabic: '',
    matan_translation: '',
    grade: '',
    source: '',
  });

  const fetchData = async () => {
    const [hadithsRes, booksRes, chaptersRes] = await Promise.all([
      supabase.from('hadiths').select('*').order('created_at', { ascending: false }),
      supabase.from('books').select('id, title').order('title'),
      supabase.from('chapters').select('id, title, book_id').order('chapter_number'),
    ]);
    if (hadithsRes.data) setHadiths(hadithsRes.data);
    if (booksRes.data) setBooks(booksRes.data);
    if (chaptersRes.data) setChapters(chaptersRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookChange = (bookId) => {
    setFormData({ ...formData, book_id: bookId, chapter_id: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingHadith) {
      await supabase.from('hadiths').update(formData).eq('id', editingHadith.id);
    } else {
      await supabase.from('hadiths').insert([formData]);
    }
    setShowForm(false);
    setEditingHadith(null);
    setFormData({
      book_id: '',
      chapter_id: '',
      hadith_number: 1,
      narrator: '',
      matan_arabic: '',
      matan_translation: '',
      grade: '',
      source: '',
    });
    fetchData();
  };

  const handleEdit = (hadith) => {
    setEditingHadith(hadith);
    setFormData({
      book_id: hadith.book_id,
      chapter_id: hadith.chapter_id,
      hadith_number: hadith.hadith_number,
      narrator: hadith.narrator,
      matan_arabic: hadith.matan_arabic,
      matan_translation: hadith.matan_translation,
      grade: hadith.grade,
      source: hadith.source,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus hadits ini?')) {
      await supabase.from('hadiths').delete().eq('id', id);
      fetchData();
    }
  };

  const getBookTitle = (bookId) => {
    return books.find(b => b.id === bookId)?.title || 'Unknown';
  };

  const getChapterTitle = (chapterId) => {
    return chapters.find(c => c.id === chapterId)?.title || 'Unknown';
  };

  const filteredChapters = chapters.filter(c => c.book_id === formData.book_id);

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Hadits
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingHadith(null);
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Hadits
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingHadith ? 'Edit Hadits' : 'Tambah Hadits Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Kitab
                </label>
                <select
                  value={formData.book_id}
                  onChange={(e) => handleBookChange(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Pilih Kitab</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Bab
                </label>
                <select
                  value={formData.chapter_id}
                  onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Pilih Bab</option>
                  {filteredChapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Nomor Hadits
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
                  Perawi
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
                  Matan Arab
                </label>
                <textarea
                  value={formData.matan_arabic}
                  onChange={(e) => setFormData({ ...formData, matan_arabic: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                  rows={3}
                  dir="rtl"
                  required
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
                  Grade / Derajat
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
                  setShowForm(false);
                  setEditingHadith(null);
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Hadits</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Kitab/Bab</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Perawi</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Grade</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {hadiths.map((hadith) => (
                <tr key={hadith.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">
                      No. {hadith.hadith_number}
                    </div>
                    <div className="font-arabic-body text-headline-sm text-secondary truncate max-w-md" dir="rtl">
                      {hadith.matan_arabic}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {getBookTitle(hadith.book_id)}
                    </div>
                    <div className="font-ui-caption text-ui-caption text-on-surface-variant">
                      {getChapterTitle(hadith.chapter_id)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {hadith.narrator || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container font-ui-caption text-ui-caption text-on-surface-variant">
                      {hadith.grade || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(hadith)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hadith.id)}
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
  );
}

export default HadithsPage;
