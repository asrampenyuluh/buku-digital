function SectionCard({ title, arabicTitle, description, readingsCount }) {
  return (
    <article className="relative flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-space-sm min-w-0 flex-1">
        <div className="flex flex-col justify-between min-w-0 flex-1 pr-1">
          <div>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h4 className="font-headline-sm text-body-reading font-bold text-on-surface truncate">{title}</h4>
                {arabicTitle && (
                  <p className="font-arabic-body text-headline-sm text-secondary leading-tight mt-0.5" dir="rtl">
                    {arabicTitle}
                  </p>
                )}
              </div>
            </div>
            {description && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-1.5 pt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-ui-caption text-ui-caption bg-secondary-container text-on-secondary-container font-semibold">
              <span className="material-symbols-outlined text-[13px]">menu_book</span>
              {readingsCount || 0} Bacaan
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function SectionList({ sections }) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
        Belum ada bagian yang tersedia.
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-space-md" id="section-list">
      {sections.map((section, index) => (
        <SectionCard key={section.id || index} {...section} />
      ))}
    </div>
  )
}

export default SectionList
