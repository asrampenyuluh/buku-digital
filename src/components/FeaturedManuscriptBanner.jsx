
function FeaturedManuscriptBanner({ manuscripts }) {
  const featured = manuscripts?.find((m) => m.is_featured) || manuscripts?.[0]

  if (!featured) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary shadow-md p-space-md">
      <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-surface-tint/20 blur-xl pointer-events-none"></div>
      <div className="relative flex flex-col space-y-space-sm z-10">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full bg-primary/40 text-on-primary-container font-ui-caption text-ui-caption tracking-wider uppercase">
            Bacaan Unggulan
          </span>
          <span className="font-arabic-body-scheherazade text-headline-sm text-secondary-container leading-none">
            {featured.title_arabic}
          </span>
        </div>
        <div className="flex items-center justify-between gap-space-md pt-1">
          <div className="flex flex-col min-w-0">
            <h2 className="font-headline-md text-headline-sm text-on-primary font-bold truncate">{featured.title}</h2>
            <p className="font-ui-caption text-ui-caption text-on-primary-container mt-0.5">{featured.author}</p>
          </div>
          <div className="relative shrink-0 flex items-center justify-center w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
              <circle
                className="text-on-primary-container/30"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeWidth="3.5"
              ></circle>
              <circle
                className="text-secondary-fixed transition-all duration-700"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeDasharray="125.6"
                strokeDashoffset="69.08"
                strokeLinecap="round"
                strokeWidth="3.5"
              ></circle>
            </svg>
            <span className="absolute font-ui-caption text-ui-caption font-bold text-secondary-fixed">45%</span>
          </div>
        </div>
        <div className="pt-2 flex items-center gap-space-xs">
          <a
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-space-md rounded-lg bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-ui-label text-ui-label font-bold transition-all shadow-sm"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Baca Sekarang</span>
          </a>
          <button
            aria-label="Tandai Selesai"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-on-primary-container/20 hover:bg-on-primary-container/30 text-on-primary transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedManuscriptBanner
