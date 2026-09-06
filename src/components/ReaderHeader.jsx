function ReaderHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-16 px-reader-gutter-mobile flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs min-w-0">
          <button
            aria-label="Kembali"
            className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors"
            onClick={() => history.back()}
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <img
            alt="Maktabah Digital Logo"
            className="h-7 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XidyYskyUTSNl8nW_7OlC2PrVu6h5d1JtgOgSrOo-FnDrKhEhOYtvH2tRJvIjEU2FP552xYpjLoRmg_kd1ikXCItr42lw6lT2SKpUwyFSSQVv_FGwEsXUk7uoP-jMD59GuikOVQVhQ9qEX8iQBdgf5V6fv5WPYufifumyzpmunPXwpH-09qDzZlUUB-MIVEfSOBZGC0rehW5BY9ITl2Jje3_r9UpNB7Tot1n577JEq8Rv6rWeLrb6VvQY"
          />
          <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">Baca Manuskrip</h1>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrQFQYR3DbrIGTa3YarlRGeLyZAozvmn4WvaOu-OwnpV0bXDIr8m_9hetPUkAjizsYOC-TC4TgJlvElTHCleyJWmPH6fkMlB0kFMgQJXzt4H3yq9UwEYnPOM_orCVpAlZMKlhPc2nc2-5vUjxDHIR-MJjV7XjfbrpormSU7Nvd1y9Ia1ABTLapbxsmWtkBXFxRsRM_blUE56DlYhlf-nzriqA--pDfmKkbs3aBt7XfeXFn4ywbo8SXwA"
          />
        </div>
      </div>
    </header>
  )
}

export default ReaderHeader
