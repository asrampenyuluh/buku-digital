function OfflineStatusCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            cloud_done
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-ui-label text-ui-label text-on-surface font-semibold">Tersimpan di Penyimpanan Lokal</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <p className="font-ui-caption text-ui-caption text-on-surface-variant truncate">
            IndexedDB Siap Offline • Teks Lengkap
          </p>
        </div>
      </div>
      <button
        className="shrink-0 bg-surface-container-highest hover:bg-surface-variant text-on-surface px-3 py-1.5 rounded-full font-ui-label text-ui-label flex items-center gap-1 transition-colors"
        title="Perbarui Sinkronisasi"
      >
        <span className="material-symbols-outlined text-[15px]">sync</span>
        <span>Perbarui</span>
      </button>
    </div>
  )
}

export default OfflineStatusCard
