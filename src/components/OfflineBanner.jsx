function OfflineBanner() {
  return (
    <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-md shadow-sm">
      <div className="flex items-start gap-space-sm">
        <div className="w-9 h-9 rounded-lg bg-surface-tint/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
          <span className="material-symbols-outlined text-[22px]">offline_bolt</span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-body-sm font-semibold text-primary">Aplikasi Siap Offline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          </div>
          <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-0.5 leading-relaxed">
            Simpan kitab ke memori perangkat untuk membaca lancar tanpa kuota internet di mana pun.
          </p>
        </div>
        <button
          className="shrink-0 px-2.5 py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-dim font-ui-caption text-ui-caption font-semibold text-primary transition-colors flex items-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[15px]">download_for_offline</span>
          <span>Atur</span>
        </button>
      </div>
    </div>
  )
}

export default OfflineBanner
