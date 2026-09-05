function DownloadActionBar() {
  return (
    <div className="flex items-center justify-between gap-space-xs pt-space-xs">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg text-on-surface shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">swap_vert</span>
        <span className="font-ui-label text-ui-label">Ukuran Terbesar</span>
      </div>
      <button
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors"
        id="btn-manage-storage"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
        <span className="font-ui-label text-ui-label font-semibold">Bersihkan Cache</span>
      </button>
    </div>
  )
}

export default DownloadActionBar
