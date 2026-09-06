import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import ManuscriptCover from '../components/ManuscriptCover'
import OfflineStatusCard from '../components/OfflineStatusCard'
import PrimaryActions from '../components/PrimaryActions'
import SectionList from '../components/SectionList'
import ReadingList from '../components/ReadingList'
import ScholarCommentary from '../components/ScholarCommentary'

function DetailPage() {
  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <Header />
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-12">
          <Breadcrumb />
          <div className="px-reader-gutter-mobile space-y-space-md">
            <ManuscriptCover />
            <OfflineStatusCard />
            <PrimaryActions />
            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Daftar Bagian</h3>
                <p className="font-ui-caption text-ui-caption text-on-surface-variant">
                  Terstruktur menurut susunan asli
                </p>
              </div>
              <span className="bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full font-ui-caption text-ui-caption font-semibold">
                1/5 Bagian Aktif
              </span>
            </div>
            <SectionList />
            <ReadingList />
            <ScholarCommentary />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DetailPage
