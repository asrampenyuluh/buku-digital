function ManuscriptCover({ manuscript }) {
  if (!manuscript) return null;

  return (
    <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-sm p-space-md">
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
        <svg className="text-primary" fill="none" height="84" viewBox="0 0 100 100" width="84">
          <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="flex gap-space-md items-start relative z-10">
        <div className="relative shrink-0 w-24 h-32 rounded bg-primary-container p-1 shadow-md flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center"
            data-alt="Intricate golden Arabesque pattern texture on emerald Islamic leather bound manuscript book cover, studio lighting, museum archival standard"
            style={{
              backgroundImage: manuscript.cover_url
                ? `url('${manuscript.cover_url}')`
                : "none",
            }}
          ></div>
          <div className="relative z-10 flex justify-between items-center text-on-primary/60 px-1 pt-0.5">
            <span className="font-ui-caption text-[8px] tracking-widest uppercase">Manuskrip</span>
            <span className="material-symbols-outlined text-[12px] text-secondary-container">auto_stories</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <div className="font-arabic-display-mobile text-[17px] leading-tight text-secondary-fixed font-bold">
              {manuscript.title_arabic || manuscript.title?.substring(0, 10)}
            </div>
            <div className="text-[8px] font-ui-caption text-on-primary tracking-tighter mt-1 opacity-90">
              {manuscript.author?.substring(0, 15)}
            </div>
          </div>
          <div className="relative z-10 w-full bg-primary/80 py-0.5 rounded-sm text-center">
            <span className="font-ui-caption text-[8px] text-secondary-fixed tracking-widest uppercase font-bold">
              {manuscript.content_type === 'hadith_collection' ? 'Hadits' : manuscript.content_type === 'khutbah' ? 'Khutbah' : 'Koleksi'}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-ui-caption text-ui-caption font-semibold">
              {manuscript.category}
            </span>
            <span className="font-ui-caption text-ui-caption text-on-surface-variant">No. {manuscript.id?.substring(0, 8)}</span>
          </div>
          <h2 className="font-arabic-display-mobile text-arabic-display-mobile text-primary leading-tight font-bold tracking-normal truncate">
            {manuscript.title_arabic || manuscript.title}
          </h2>
          <p className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight mt-0.5">
            {manuscript.title}
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
            {manuscript.author} {manuscript.author_arabic && <span className="text-secondary font-medium">({manuscript.author_arabic})</span>}
          </p>
          <div className="flex items-center gap-3 mt-2 text-on-surface-variant font-ui-label text-ui-label">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">folder_open</span>
              {manuscript.total_chapters || 0} Bagian
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
              {manuscript.total_hadiths || 0} Bacaan
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManuscriptCover;
