import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function ChaptersPage() {
  const [chapters, setChapters] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [formData, setFormData] = useState({
    book_id: '',
    chapter_number: 1,
    title: '',
    title_arabic: '',
    description: '',
    hadiths_count: 0,
  });

  const fetchData = async () => {
    const [chaptersRes, booksRes] = await Promise.all([
      supabase.from('chapters').select('*').order('created_at', { ascending: false }),
      supabase.from('books').select('id, title').order('title'),
    ]);
    if (chaptersRes.data) setChapters(chaptersRes.data);
    if (booksRes.data) setBooks(booksRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingChapter) {
      await supabase.from('chapters').update(formData).eq('id', editingChapter.id);
    } else {
      await supabase.from('chapters').insert([formData]);
    }
    setShowForm(false);
    setEditingChapter(null);
    setFormData({
      book_id: '',
      chapter_number: 1,
      title: '',
      title_arabic: '',
      description: '',
      hadiths_count: 0,
    });
    fetchData();
  };

  const handleEdit = (chapter) => {
    setEditingChapter(chapter);
    setFormData({
      book_id: chapter.book_id,
      chapter_number: chapter.chapter_number,
      title: chapter.title,
      title_arabic: chapter.title_arabic,
      description: chapter.description,
      hadiths_count: chapter.hadiths_count,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus bab ini?')) {
      await supabase.from('chapters').delete().eq('id', id);
      fetchData();
    }
  };

  const getBookTitle = (bookId) => {
    return books.find(b => b.id === bookId)?.title || 'Unknown';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Bab
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingChapter(null);
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Bab
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingChapter ? 'Edit Bab' : 'Tambah Bab Baru'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Kitab
                </label>
                <select
                  value={formData.book_id}
                  onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
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
                  Nomor Bab
                </label>
                <input
                  type="number"
                  value={formData.chapter_number}
                  onChange={(e) => setFormData({ ...formData, chapter_number: parseInt(e.target.value) || 1 })}
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
                  required
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
                  setShowForm(false);
                  setEditingChapter(null);
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Bab</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Kitab</th>
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Hadits</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {chapters.map((chapter) => (
                <tr key={chapter.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">
                      {chapter.chapter_number}. {chapter.title}
                    </div>
                    <div className="font-arabic-body text-headline-sm text-secondary" dir="rtl">
                      {chapter.title_arabic}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {getBookTitle(chapter.book_id)}
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {chapter.hadiths_count}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(chapter)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(chapter.id)}
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

export default ChaptersPage;
