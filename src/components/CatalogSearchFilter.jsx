import { useState } from 'react'

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'hadits', label: 'Hadits' },
  { id: 'fiqih', label: 'Fiqih' },
  { id: 'aqidah', label: 'Aqidah' },
  { id: 'tafsir', label: 'Tafsir' },
  { id: 'bahasa', label: 'Bahasa Arab' },
]

function CatalogSearchFilter() {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <div className="flex flex-col space-y-space-sm pt-space-xs">
      <div className="relative flex items-center w-full">
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[22px] pointer-events-none">
          search
        </span>
        <input
          className="w-full h-12 pl-12 pr-11 bg-surface-container rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-colors shadow-sm"
          id="book-search"
          placeholder="Cari judul kitab, pengarang, atau topik..."
          type="search"
        />
        <button
          aria-label="Suara atau filter mendalam"
          className="absolute right-3 p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar -mx-reader-gutter-mobile px-reader-gutter-mobile sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-chip px-3.5 py-1.5 rounded-full font-ui-label text-ui-label whitespace-nowrap shrink-0 transition-all active:scale-95 ${
              activeFilter === cat.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
            onClick={() => setActiveFilter(cat.id)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CatalogSearchFilter
