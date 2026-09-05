function DiscoverMore() {
  return (
    <div className="pt-space-xs flex flex-col items-center justify-center text-center gap-space-xs">
      <a
        className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 bg-surface-container text-primary font-ui-label text-ui-label rounded-xl hover:bg-surface-container-high transition-colors shadow-sm"
        href="#"
      >
        <span className="material-symbols-outlined text-[20px]">explore</span>
        <span>Jelajahi &amp; Unduh Kitab Lainnya</span>
      </a>
      <span className="font-ui-caption text-ui-caption text-on-surface-variant">
        Tersedia lebih dari 120+ kutub turats berlisensi terbuka di katalog.
      </span>
    </div>
  )
}

export default DiscoverMore
