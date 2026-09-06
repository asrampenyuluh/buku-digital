function ManuscriptCard({ title, arabicTitle, author, meta, chips, storage, actions, content_type }) {
  const typeLabels = {
    khutbah: 'Khutbah',
    amalan: 'Amalan',
    shalawat: 'Shalawat',
    talqin: 'Talqin',
    hadith_collection: 'Hadits',
    general: 'Umum',
  }

  const typeIcons = {
    khutbah: 'mic',
    amalan: 'prayer_times',
    shalawat: 'favorite',
    talqin: 'church',
    hadith_collection: 'menu_book',
    general: 'library_books',
  }

  return (
    <article className="relative flex flex-col sm:flex-row bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-space-sm min-w-0 flex-1">
        <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 shadow-inner bg-surface-container-high flex flex-col justify-between p-1.5">
          <img
            className="w-full h-full object-cover rounded"
            data-alt={meta.alt}
            src={meta.src}
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-between min-w-0 flex-1 pr-1">
          <div>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h4 className="font-headline-sm text-body-reading font-bold text-on-surface truncate">{title}</h4>
                {arabicTitle && (
                  <p className="font-arabic-body text-headline-sm text-secondary leading-tight mt-0.5" dir="rtl">
                    {arabicTitle}
                  </p>
                )}
              </div>
            </div>
            <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-1 truncate">{author}</p>
          </div>
          <div className="flex items-center flex-wrap gap-1.5 pt-2">
            {content_type && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-ui-caption text-ui-caption bg-primary-fixed text-on-primary-fixed font-semibold">
                <span className="material-symbols-outlined text-[13px]">{typeIcons[content_type] || 'library_books'}</span>
                {typeLabels[content_type] || 'Umum'}
              </span>
            )}
            {chips.map((chip, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-ui-caption text-ui-caption ${
                  chip.variant === 'filled'
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'bg-secondary-container text-on-secondary-container font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-space-xs sm:pt-0 mt-2 sm:mt-0 sm:border-0 border-t border-surface-container">
        <span className="font-ui-caption text-ui-caption text-outline sm:hidden">{storage}</span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg font-ui-label text-ui-label font-medium transition-colors shadow-sm ${
                action.variant === 'primary'
                  ? 'bg-primary text-on-primary hover:bg-primary-container'
                  : 'bg-surface-container hover:bg-surface-container-high text-primary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function ManuscriptList({ manuscripts }) {
  if (!manuscripts || manuscripts.length === 0) {
    return (
      <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
        Belum ada manuskrip yang tersedia.
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-space-md" id="manuscript-list">
      {manuscripts.map((manuscript, index) => (
        <ManuscriptCard key={manuscript.id || index} {...manuscript} />
      ))}
    </div>
  )
}

export default ManuscriptList
