
import { useState } from 'react';

function CatalogSearchFilter({ categories, onFilterChange, activeFilter, contentTypes, activeType }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onFilterChange?.({ query, category: activeFilter, contentType: activeType })
  }

  const handleCategoryClick = (categorySlug) => {
    onFilterChange?.({ query: searchQuery, category: categorySlug, contentType: activeType })
  }

  const handleTypeClick = (typeSlug) => {
    onFilterChange?.({ query: searchQuery, category: activeFilter, contentType: typeSlug })
  }

  return (
    <div className="flex flex-col space-y-space-sm pt-space-xs">
      <div className="relative flex items-center w-full">
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[22px] pointer-events-none">
          search
        </span>
        <input
          className="w-full h-12 pl-12 pr-11 bg-surface-container rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-colors shadow-sm"
          id="manuscript-search"
          placeholder="Cari judul, pengarang, atau topik..."
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          aria-label="Filter lanjutan"
          className="absolute right-3 p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar -mx-reader-gutter-mobile px-reader-gutter-mobile sm:mx-0 sm:px-0">
        {Array.isArray(contentTypes) && contentTypes.map((type) => (
          <button
            key={type.slug}
            className={`filter-chip px-3.5 py-1.5 rounded-full font-ui-label text-ui-label whitespace-nowrap shrink-0 transition-all active:scale-95 ${
              activeType === type.slug
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
            onClick={() => handleTypeClick(type.slug)}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px] mr-1">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar -mx-reader-gutter-mobile px-reader-gutter-mobile sm:mx-0 sm:px-0">
        <button
          className={`filter-chip px-3.5 py-1.5 rounded-full font-ui-label text-ui-label whitespace-nowrap shrink-0 transition-all active:scale-95 ${
            activeFilter === 'all'
              ? 'bg-secondary-container text-on-secondary-container shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
          onClick={() => handleCategoryClick('all')}
          type="button"
        >
          Semua
        </button>
        {Array.isArray(categories) && categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-chip px-3.5 py-1.5 rounded-full font-ui-label text-ui-label whitespace-nowrap shrink-0 transition-all active:scale-95 ${
              activeFilter === cat.slug
                ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
            onClick={() => handleCategoryClick(cat.slug)}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CatalogSearchFilter
