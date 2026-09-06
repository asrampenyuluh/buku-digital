function ReadingCard({ reading_number, speaker_narrator, arabic_text, translation, grade, source }) {
  return (
    <article className="relative flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-space-sm min-w-0 flex-1">
        <div className="flex flex-col justify-between min-w-0 flex-1 pr-1">
          <div>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h4 className="font-headline-sm text-body-reading font-bold text-on-surface truncate">
                  Bacaan {reading_number || 1}
                </h4>
                {speaker_narrator && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{speaker_narrator}</p>
                )}
              </div>
              {grade && (
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-ui-caption text-ui-caption font-semibold shrink-0">
                  {grade}
                </span>
              )}
            </div>
            {arabic_text && (
              <p className="font-arabic-body text-headline-sm text-secondary leading-tight mt-1" dir="rtl">
                {arabic_text}
              </p>
            )}
            {translation && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{translation}</p>
            )}
            {source && (
              <p className="font-ui-caption text-ui-caption text-outline mt-1">Sumber: {source}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function ReadingList({ readings }) {
  if (!readings || readings.length === 0) {
    return (
      <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
        Belum ada bacaan yang tersedia.
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-space-md" id="reading-list">
      {readings.map((reading, index) => (
        <ReadingCard key={reading.id || index} {...reading} />
      ))}
    </div>
  )
}

export default ReadingList
