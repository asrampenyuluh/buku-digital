import CatalogHeader from '../components/CatalogHeader'
import CatalogSearchFilter from '../components/CatalogSearchFilter'
import OfflineBanner from '../components/OfflineBanner'
import FeaturedBookBanner from '../components/FeaturedBookBanner'
import BookList from '../components/BookList'
import QuoteFooter from '../components/QuoteFooter'
import BottomNav from '../components/BottomNav'

function CatalogPage() {
  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <CatalogHeader />
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-[46rem] mx-auto px-reader-gutter-mobile sm:px-reader-gutter-tablet pb-space-2xl space-y-space-lg">
          <CatalogSearchFilter />
          <OfflineBanner />
          <FeaturedBookBanner />
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline-md text-headline-sm text-primary font-bold">Koleksi Kitab Utama</h3>
              <span className="font-ui-caption text-ui-caption text-on-surface-variant font-medium">
                (5 Kitab Terpilih)
              </span>
            </div>
            <span className="font-ui-caption text-ui-caption text-secondary font-semibold">Tersinkronisasi</span>
          </div>
          <BookList />
          <QuoteFooter />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default CatalogPage
