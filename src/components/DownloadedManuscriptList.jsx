function DownloadedManuscriptCard({ title, arabicTitle, author, size, meta, badges }) {
  return (
    <div className="group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col gap-space-sm relative overflow-hidden">
      <div className="flex items-start gap-space-sm">
        <div className="w-16 h-20 bg-primary-container rounded-lg overflow-hidden shrink-0 shadow-sm flex items-center justify-center relative">
          <img
            className="w-full h-full object-cover"
            data-alt={meta.alt}
            src={meta.src}
          />
          <span className="absolute bottom-1 right-1 bg-surface/90 text-primary rounded-full px-1 text-[9px] font-bold">
            {size}
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{title}</h2>
            <span
              className="material-symbols-outlined text-[18px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          {arabicTitle && (
            <p
              className="font-arabic-display-mobile text-arabic-display-mobile text-primary leading-none text-right my-0.5"
              dir="rtl"
            >
              {arabicTitle}
            </p>
          )}
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{author}</span>
          <div className="flex items-center gap-2 mt-1">
            {badges.map((badge, idx) => (
              <span key={idx} className="font-ui-caption text-ui-caption text-secondary font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-space-2xs">
        <button
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors px-2 py-1 rounded"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
          <span className="font-ui-caption text-ui-caption font-medium">Hapus</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span className="font-ui-label text-ui-label">Baca Offline</span>
        </button>
      </div>
    </div>
  )
}

function DownloadedManuscriptList() {
  const manuscripts = [
    {
      title: 'Riyadhus Shalihin',
      arabicTitle: 'رياض الصالحين',
      author: 'Imam An-Nawawi',
      size: '12MB',
      badges: ['19 Bagian • 1,896 Hadits', 'Diunduh 2 hr lalu'],
      meta: {
        alt: 'Cover of Riyadhus Shalihin classical Islamic hadith book',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDJwzCOKoQe6N3sBxANyMEwahteBNkxhNQ_30ssfg6ksvlfmQhxQH9c9SjtLt7ULCn2IzFTsmnuBJ2ESUXOf0tO-y6UZTqtSZHqdYlGHG_b0Aw4XeANgBJHJlxi-rjxlHkTP9EhHL1ldoUWC_RjfpobIUlaVCMzLBS9xzTRadURYye-sXIRB9I0IDcbkOtBqHNaEiaxp2GllbpB9Axv1rP5LUsHG77U2KD4NtjoRQ68YLSVhNIe9KEZA',
      },
    },
    {
      title: 'Al-Arba\'in An-Nawawiyyah',
      arabicTitle: 'الأربعون النووية',
      author: 'Imam An-Nawawi',
      size: '3.8MB',
      badges: ['42 Hadits Lengkap', 'Terverifikasi'],
      meta: {
        alt: 'Cover of Al Arbain An Nawawiyyah 40 Hadith book',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR9APepJDL2-U4q30ip-MtVMhjzYNOwRxnZtBGE6fos4xdxiF9hW2-LoaZyDvSgLW4NcIQaSwSFwhkrFmjiBiM_1SjbVZ6S2Ur8urveE3gJ9aquV0o_jpCDWzTS4N-64bRQDT3w3EZmvWMRYnaw25iVTpOUovCCNsWA9cJgRSmjQpymsNFa1zrhbaClxvjwAzAKY37wFnXIhanf2jZzU0roq_5k_6JRYpDGpIrZoxGjhzzh8zdsXwbvg',
      },
    },
    {
      title: 'Safinatun Naja',
      arabicTitle: 'سفينة النجاة',
      author: 'Syaikh Salim bin Sumair Al-Hadhrami',
      size: '4.2MB',
      badges: ['Fiqih Ibadah Dasar', 'Lengkap'],
      meta: {
        alt: 'Cover of Safinatun Naja classical fiqh treatise book',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRvBtxZ-1RAsuFAZRmnTHxTEKkN8HO1RuC_lCfLHBXyH9NJ51geDBBGAHzGG6E8GKavdhInFPCp5hP0Wb15iTIJAMtCsXeTSONpe2GxIO-EPuM7YXKlWoPOLvLiTqo0r_KS766Uq7QQK8glD4Z2LsXC5AnbyqwFqsk6QWASF9AUDR_ZbqQBZT81D1YsPW4_Z0Y7eZGh7r049z_Elz1DOrugzLaGNvqRM_1OgQlR0xfQdBbfPLVmUxHSw',
      },
    },
    {
      title: 'Al-Ajurrumiyyah',
      arabicTitle: 'متن الآجرومية',
      author: 'Ibnu Ajurrum',
      size: '2.1MB',
      badges: ['Nahwu Dasar • Matn', 'Lengkap'],
      meta: {
        alt: 'Cover of Matn Al-Ajurrumiyyah Arabic grammar manuscript book',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVRJCKE8Fcd0F8ofIuiAEcW12bmbge9uHAowpwHTUMD6ZaZK6zzBSGO44a5dPcjqSZ5zwRB4H4qdjb5vxpk75mvXGa6xHfq6IuQDxq0C10IrrpBa_MsXkmP5gDmGeB3LCeUaDolqYciKjLJLw0B-nrbQYhXI_QA-MGn0-m54HQYBthEtLewVrjXs3PvWK7eYq3L9QKOR0upp89CCH7rLIlxXuFW_t-DOEpWuF5El3iQImh3QdG9WwStA',
      },
    },
  ]

  return (
    <div className="flex flex-col space-y-space-sm" id="downloaded-list">
      {manuscripts.map((manuscript, index) => (
        <DownloadedManuscriptCard key={index} {...manuscript} />
      ))}
    </div>
  )
}

export default DownloadedManuscriptList
