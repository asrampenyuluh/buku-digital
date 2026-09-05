import { useEffect, useState } from 'react';
import CatalogHeader from '../components/CatalogHeader';
import CatalogSearchFilter from '../components/CatalogSearchFilter';
import OfflineBanner from '../components/OfflineBanner';
import FeaturedBookBanner from '../components/FeaturedBookBanner';
import BookList from '../components/BookList';
import QuoteFooter from '../components/QuoteFooter';
import BottomNav from '../components/BottomNav';
import { supabase } from '../lib/supabase';

function CatalogPage() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [booksRes, categoriesRes] = await Promise.all([
        supabase.from('books').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      ])
      if (booksRes.data) {
        setBooks(booksRes.data)
        setFilteredBooks(booksRes.data)
      }
      if (categoriesRes.data) setCategories(categoriesRes.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleFilterChange = ({ query, category }) => {
    setActiveFilter(category)

    let filtered = books

    if (category && category !== 'all') {
      filtered = filtered.filter((book) => book.category === category)
    }

    if (query) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.title_arabic.includes(q)
      )
    }

    setFilteredBooks(filtered)
  }

  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <CatalogHeader />
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-[46rem] mx-auto px-reader-gutter-mobile sm:px-reader-gutter-tablet pb-space-2xl space-y-space-lg">
          <CatalogSearchFilter
            categories={categories}
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />
          <OfflineBanner />
          {loading ? (
            <div className="text-center py-8 font-body-sm text-body-sm text-on-surface-variant">
              Memuat kitab...
            </div>
          ) : (
            <FeaturedBookBanner books={filteredBooks} />
          )}
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline-md text-headline-sm text-primary font-bold">Koleksi Kitab Utama</h3>
              <span className="font-ui-caption text-ui-caption text-on-surface-variant font-medium">
                ({filteredBooks.length} Kitab)
              </span>
            </div>
            <span className="font-ui-caption text-ui-caption text-secondary font-semibold">Tersinkronisasi</span>
          </div>
          <BookList books={filteredBooks} />
          <QuoteFooter />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default CatalogPage
