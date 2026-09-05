import { useState } from 'react'

function ReaderContextBar({ onToggleSettings }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  return (
    <aside className="sticky top-16 z-40 bg-surface-container-low/95 backdrop-blur-md px-reader-gutter-mobile py-2.5 shadow-sm transition-colors duration-300">
      <div className="max-w-reading-column-max mx-auto flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-ui-caption text-ui-caption shrink-0">
            <span className="material-symbols-outlined text-[13px]">menu_book</span>
            Bab 1 • Hadits 1
          </span>
          <span className="font-ui-label text-ui-label text-on-surface-variant truncate">Riyadhus Shalihin</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Dengarkan Audio Tilawah Hadits"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              isAudioPlaying ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
            }`}
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAudioPlaying ? 'pause_circle' : 'volume_up'}
            </span>
          </button>
          <button
            aria-label="Tandai Hadits"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
          <button
            aria-label="Buka Pengaturan Baca"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-all"
            onClick={onToggleSettings}
          >
            <span className="material-symbols-outlined text-[19px]">tune</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default ReaderContextBar
