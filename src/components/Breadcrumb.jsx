function Breadcrumb() {
  return (
    <div className="px-reader-gutter-mobile py-space-xs flex items-center justify-between text-on-surface-variant">
      <div className="flex items-center gap-1.5 font-ui-caption text-ui-caption tracking-wider uppercase">
        <span className="hover:text-primary transition-colors cursor-pointer">Koleksi Manuskrip</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-semibold">Koleksi Utama</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant" title="Penanda Buku">
          <span className="material-symbols-outlined text-[18px]">bookmark</span>
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant" title="Informasi Manuskrip">
          <span className="material-symbols-outlined text-[18px]">info</span>
        </button>
      </div>
    </div>
  )
}

export default Breadcrumb
