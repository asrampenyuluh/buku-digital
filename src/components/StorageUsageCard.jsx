function StorageUsageCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-md">
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-space-xs">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[22px]">database</span>
          </div>
          <div className="flex flex-col">
            <span className="font-ui-label text-ui-label text-on-surface">Kapasitas PWA Maktabah</span>
            <span className="font-ui-caption text-ui-caption text-on-surface-variant">Browser Cache API & IndexedDB</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container-highest rounded-full font-ui-caption text-ui-caption text-primary font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-ping"></span>
          Aktif & Terproteksi
        </span>
      </div>
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-baseline">
          <div className="flex items-baseline gap-1">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">34.8 MB</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">terpakai</span>
          </div>
          <span className="font-ui-caption text-ui-caption text-on-surface-variant font-medium">1.2 GB kuota browser</span>
        </div>
        <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex shadow-inner">
          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '14%' }}></div>
          <div className="h-full bg-secondary transition-all duration-700 ml-0.5 rounded-full" style={{ width: '6%' }}></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-space-xs pt-1 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-on-surface">
          <span className="material-symbols-outlined text-[15px] text-primary">menu_book</span>
          <span className="font-ui-label text-ui-label font-medium">4 Kitab Lengkap</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-on-surface">
          <span className="material-symbols-outlined text-[15px] text-secondary">bookmark</span>
          <span className="font-ui-label text-ui-label font-medium">89 Bab</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-on-surface">
          <span className="material-symbols-outlined text-[15px] text-surface-tint">format_quote</span>
          <span className="font-ui-label text-ui-label font-medium">1,940 Sub-bab/Hadits</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5 p-space-xs bg-surface-container-high rounded-lg text-primary">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span className="material-symbols-outlined text-[16px]">wifi_off</span>
        </div>
        <span className="font-ui-caption text-ui-caption text-on-surface leading-tight font-medium">
          Semua data telah disinkronkan ke cache lokal. Siap dibaca saat bepergian atau jaringan terputus.
        </span>
      </div>
    </div>
  )
}

export default StorageUsageCard
