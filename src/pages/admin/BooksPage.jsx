import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    title_arabic: '',
    author: '',
    category: '',
    total_hadiths: 0,
    total_chapters: 0,
    file_size_mb: 0,
  });

  const fetchBooks = async () => {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (data) setBooks(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setCategories(data);
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await supabase.from('books').update(formData).eq('id', editingBook.id);
    } else {
      await supabase.from('books').insert([formData]);
    }
    setShowForm(false);
    setEditingBook(null);
    setFormData({
      title: '',
      title_arabic: '',
      author: '',
      category: categories[0]?.slug || '',
      total_hadiths: 0,
      total_chapters: 0,
      file_size_mb: 0,
    });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      title_arabic: book.title_arabic,
      author: book.author,
      category: book.category,
      total_hadiths: book.total_hadiths,
      total_chapters: book.total_chapters,
      file_size_mb: book.file_size_mb,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus kitab ini?')) {
      await supabase.from('books').delete().eq('id', id);
      fetchBooks();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          Kelola Kitab
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingBook(null);
          }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors"
        >
          + Tambah Kitab
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            {editingBook ? 'Edit Kitab' : 'Tambah Kitab Baru'}
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
                  required
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
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Total Hadits
                </label>
                <input
                  type="number"
                  value={formData.total_hadiths}
                  onChange={(e) => setFormData({ ...formData, total_hadiths: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm border border-outline focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                  Total Bab
                </label>
                <input
                  type="number"
                  value={formData.total_chapters}
                  onChange={(e) => setFormData({ ...formData, total_chapters: parseInt(e.target.value) || 0 })}
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
                  setEditingBook(null);
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
                <th className="px-4 py-3 text-left font-ui-label text-ui-label text-on-surface-variant">Hadits</th>
                <th className="px-4 py-3 text-right font-ui-label text-ui-label text-on-surface-variant">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-body-sm text-body-sm text-on-surface font-medium">{book.title}</div>
                    <div className="font-arabic-body text-headline-sm text-secondary" dir="rtl">
                      {book.title_arabic}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">{book.author}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container font-ui-caption text-ui-caption text-on-surface-variant">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">{book.total_hadiths}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(book)}
                      className="font-ui-caption text-ui-caption text-primary hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
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

export default BooksPage;
