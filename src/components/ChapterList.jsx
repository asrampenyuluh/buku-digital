import { useState } from 'react'

function ChapterItem({ number, title, arabicTitle, description, haditsCount, status, progress, isExpanded }) {
  const [isOpen, setIsOpen] = useState(isExpanded)

  const toggleChapter = () => {
    setIsOpen(!isOpen)
  }

  const isCompleted = status === 'completed'
  const isActive = status === 'active'

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div
        className="p-space-md cursor-pointer select-none bg-surface-container-low transition-colors"
        onClick={toggleChapter}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-7 h-7 rounded-full font-ui-label text-ui-label font-bold flex items-center justify-center shrink-0 ${
                isCompleted || isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface'
              }`}
            >
              {number}
            </span>
            <div>
              {isCompleted && (
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                  <span className="font-ui-caption text-[11px] text-primary font-semibold">Tamat Dipelajari</span>
                </div>
              )}
              {isActive && (
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-ui-caption text-[10px] font-bold uppercase tracking-wider">
                  Sedang Dibaca • {progress}%
                </span>
              )}
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">{title}</h4>
              {description && !isCompleted && (
                <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <span
              className="font-arabic-display-mobile text-[22px] leading-normal text-primary font-bold block"
              dir="rtl"
            >
              {arabicTitle}
            </span>
            <span className="font-ui-caption text-ui-caption text-on-surface-variant">{haditsCount} Hadits</span>
          </div>
        </div>
        {isActive && (
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="p-space-sm bg-surface-container-low text-center">
          {isCompleted ? (
            <p className="font-ui-caption text-ui-caption text-on-surface-variant py-2">
              Bab telah selesai dibaca. Ketuk tombol untuk membuka catatan ringkas atau mengulang bacaan.
            </p>
          ) : (
            <button className="bg-primary text-on-primary font-ui-label text-ui-label px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Buka Seluruh Bab {number}</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function ChapterList() {
  const chapters = [
    {
      number: 1,
      title: 'Keikhlasan dan Menghadirkan Niat',
      arabicTitle: 'الإِخْلَاصُ وَإِحْضَارُ النِّيَّةِ',
      haditsCount: 12,
      status: 'active',
      progress: 80,
      isExpanded: true,
    },
    {
      number: 2,
      title: 'Pintu Taubat',
      arabicTitle: 'بَابُ التَّوْبَةِ',
      haditsCount: 18,
      status: 'completed',
      isExpanded: false,
    },
    {
      number: 3,
      title: 'Pintu Kesabaran',
      arabicTitle: 'بَابُ الصَّبْرِ',
      description: 'Keutamaan sabar dalam menghadapi cobaan & taat',
      haditsCount: 29,
      status: 'default',
      isExpanded: false,
    },
    {
      number: 4,
      title: 'Pintu Kejujuran',
      arabicTitle: 'بَابُ الصِّدْقِ',
      description: 'Kejujuran membawa kebaikan dan surga',
      haditsCount: 8,
      status: 'default',
      isExpanded: false,
    },
    {
      number: 5,
      title: 'Pintu Muraqabah',
      arabicTitle: 'بَابُ المُرَاقَبَةِ',
      description: 'Merasa selalu dalam pengawasan Allah Ta\'ala',
      haditsCount: 14,
      status: 'default',
      isExpanded: false,
    },
  ]

  return (
    <div className="space-y-space-sm" id="chapter-accordion">
      {chapters.map((chapter) => (
        <ChapterItem key={chapter.number} {...chapter} />
      ))}
    </div>
  )
}

export default ChapterList
