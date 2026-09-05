function DownloadsHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-16 px-reader-gutter-mobile flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs min-w-0">
          <img
            alt="Maktabah Digital Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XidyYskyUTSNl8nW_7OlC2PrVu6h5d1JtgOgSrOo-FnDrKhEhOYtvH2tRJvIjEU2FP552xYpjLoRmg_kd1ikXCItr42lw6lT2SKpUwyFSSQVv_FGwEsXUk7uoP-jMD59GuikOVQVhQ9qEX8iQBdgf5V6fv5WPYufifumyzpmunPXwpH-09qDzZlUUB-MIVEfSOBZGC0rehW5BY9ITl2Jje3_r9UpNB7Tot1n577JEq8Rv6rWeLrb6VvQY"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate leading-none">
              Maktabah Digital
            </span>
            <span className="font-ui-caption text-ui-caption text-on-surface-variant truncate">Unduhan</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-ui-caption text-ui-caption text-primary font-medium hidden sm:inline">
              Tersinkron
            </span>
          </div>
          <button
            aria-label="Profil Pembaca"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
            type="button"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrQFQYR3DbrIGTa3YarlRGeLyZAozvmn4WvaOu-OwnpV0bXDIr8m_9hetPUkAjizsYOC-TC4TgJlvElTHCleyJWmPH6fkMlB0kFMgQJXzt4H3yq9UwEYnPOM_orCVpAlZMKlhPc2nc2-5vUjxDHIR-MJjV7XjfbrpormSU7Nvd1y9Ia1ABTLapbxsmWtkBXFxRsRM_blUE56DlYhlf-nzriqA--pDfmKkbs3aBt7XfeXFn4ywbo8SXwA"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default DownloadsHeader
