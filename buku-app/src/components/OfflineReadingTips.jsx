function OfflineReadingTips() {
  return (
    <div className="p-space-md bg-secondary-fixed/25 rounded-xl flex items-start gap-space-sm">
      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-[18px]">lightbulb</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-ui-label text-ui-label text-on-secondary-fixed font-bold">PWA Mode Siap</span>
        <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-snug">
          Saat koneksi internet mati atau mode pesawat aktif, Anda tetap bisa membuka semua kitab di atas lengkap
          dengan pengaturan font dan pencarian lokal berkat arsitektur IndexedDB.
        </p>
      </div>
    </div>
  )
}

export default OfflineReadingTips
