import DownloadsHeader from '../components/DownloadsHeader'
import StorageUsageCard from '../components/StorageUsageCard'
import DownloadActionBar from '../components/DownloadActionBar'
import DownloadedManuscriptList from '../components/DownloadedManuscriptList'
import OfflineReadingTips from '../components/OfflineReadingTips'
import DiscoverMore from '../components/DiscoverMore'
import BottomNav from '../components/BottomNav'

function DownloadsPage() {
  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <DownloadsHeader />
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-[46rem] mx-auto px-reader-gutter-mobile sm:px-reader-gutter-tablet pb-space-2xl space-y-space-md">
          <div className="pt-space-xs pb-space-xs flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                offline_pin
              </span>
              <span className="font-ui-caption text-ui-caption uppercase tracking-wider text-surface-tint font-bold">
                Penyimpanan Terisolasi (IndexedDB)
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Manuskrip Tersimpan Offline</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Dapat dibaca tanpa koneksi internet melalui IndexedDB lokal dengan kecepatan instan.
            </p>
          </div>
          <StorageUsageCard />
          <DownloadActionBar />
          <DownloadedManuscriptList />
          <OfflineReadingTips />
          <DiscoverMore />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default DownloadsPage
