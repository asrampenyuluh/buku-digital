function PrimaryActions() {
  return (
    <div className="space-y-2">
      <button className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-space-md rounded-xl font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]">
        <span className="material-symbols-outlined text-[24px]">menu_book</span>
        <span>Mulai Membaca</span>
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-surface-container hover:bg-surface-container-high text-on-surface py-2.5 px-3 rounded-xl font-ui-label text-ui-label flex items-center justify-center gap-1.5 transition-colors">
          <span className="material-symbols-outlined text-[18px] text-secondary">offline_pin</span>
          <span>Simpan Offline</span>
        </button>
        <button className="bg-surface-container hover:bg-surface-container-high text-on-surface py-2.5 px-3 rounded-xl font-ui-label text-ui-label flex items-center justify-center gap-1.5 transition-colors">
          <span className="material-symbols-outlined text-[18px] text-secondary">share</span>
          <span>Bagikan</span>
        </button>
      </div>
    </div>
  )
}

export default PrimaryActions
