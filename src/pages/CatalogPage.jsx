import { useEffect, useState } from 'react'
import CatalogHeader from '../components/CatalogHeader'
import CatalogSearchFilter from '../components/CatalogSearchFilter'
import OfflineBanner from '../components/OfflineBanner'
import FeaturedManuscriptBanner from '../components/FeaturedManuscriptBanner'
import ManuscriptList from '../components/ManuscriptList'
import QuoteFooter from '../components/QuoteFooter'
import BottomNav from '../components/BottomNav'
import { supabase } from '../lib/supabase'

const contentTypes = [
  { slug: 'all', label: 'Semua', icon: 'auto_stories' },
  { slug: 'khutbah', label: 'Khutbah', icon: 'mic' },
  { slug: 'amalan', label: 'Amalan', icon: 'prayer_times' },
  { slug: 'shalawat', label: 'Shalawat', icon: 'favorite' },
  { slug: 'talqin', label: 'Talqin', icon: 'church' },
  { slug: 'hadith_collection', label: 'Hadits', icon: 'menu_book' },
  { slug: 'general', label: 'Lainnya', icon: 'library_books' },
]

function CatalogPage() {
  const [manuscripts, setManuscripts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeType, setActiveType] = useState('all')
  const [filteredManuscripts, setFilteredManuscripts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [manuscriptsRes, categoriesRes] = await Promise.all([
        supabase.from('manuscripts').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      ])
      if (manuscriptsRes.data) {
        setManuscripts(manuscriptsRes.data)
        setFilteredManuscripts(manuscriptsRes.data)
      }
      if (categoriesRes.data) setCategories(categoriesRes.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleFilterChange = ({ query, category, contentType }) => {
    setActiveFilter(category)
    setActiveType(contentType)

    let filtered = manuscripts

    if (category && category !== 'all') {
      filtered = filtered.filter((m) => m.category === category)
    }

    if (contentType && contentType !== 'all') {
      filtered = filtered.filter((m) => m.content_type === contentType)
    }

    if (query) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.author.toLowerCase().includes(q) ||
          (m.title_arabic && m.title_arabic.includes(q)) ||
          (m.tags && m.tags.some((tag) => tag.toLowerCase().includes(q)))
      )
    }

    setFilteredManuscripts(filtered)
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
            contentTypes={contentTypes}
            activeType={activeType}
          />
          <OfflineBanner />
          {loading ? (
            <div className="text-center py-8 font-body-sm text-body-sm text-on-surface-variant">
              Memuat manuskrip...
            </div>
          ) : (
            <FeaturedManuscriptBanner manuscripts={filteredManuscripts} />
          )}
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline-md text-headline-sm text-primary font-bold">Koleksi Utama</h3>
              <span className="font-ui-caption text-ui-caption text-on-surface-variant font-medium">
                ({filteredManuscripts.length} Manuskrip)
              </span>
            </div>
            <span className="font-ui-caption text-ui-caption text-secondary font-semibold">Tersinkronisasi</span>
          </div>
          <ManuscriptList manuscripts={filteredManuscripts} />
          <QuoteFooter />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default CatalogPage
