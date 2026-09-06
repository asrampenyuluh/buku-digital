import { useEffect, useState } from 'react'

const fontSizes = [18, 20, 22, 24, 28, 32, 36]

function ReaderCustomizer({
  onFontSizeChange,
  onFontChange,
  onThemeChange,
  initialFontSize = 24,
  initialFont = 'font-arabic-body',
  initialTheme = 'theme-sepia',
}) {
  const [currentSizeIdx, setCurrentSizeIdx] = useState(
    fontSizes.indexOf(initialFontSize) !== -1 ? fontSizes.indexOf(initialFontSize) : 3
  )
  const [selectedFont, setSelectedFont] = useState(initialFont)
  const [selectedTheme, setSelectedTheme] = useState(initialTheme)

  useEffect(() => {
    const idx = fontSizes.indexOf(initialFontSize)
    if (idx !== -1) setCurrentSizeIdx(idx)
  }, [initialFontSize])

  useEffect(() => {
    setSelectedFont(initialFont)
  }, [initialFont])

  useEffect(() => {
    setSelectedTheme(initialTheme)
  }, [initialTheme])

  const handleFontDec = () => {
    if (currentSizeIdx > 0) {
      const newIdx = currentSizeIdx - 1
      setCurrentSizeIdx(newIdx)
      onFontSizeChange?.(fontSizes[newIdx])
    }
  }

  const handleFontInc = () => {
    if (currentSizeIdx < fontSizes.length - 1) {
      const newIdx = currentSizeIdx + 1
      setCurrentSizeIdx(newIdx)
      onFontSizeChange?.(fontSizes[newIdx])
    }
  }

  const handleFontChange = (font) => {
    setSelectedFont(font)
    onFontChange?.(font)
  }

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme)
    onThemeChange?.(theme)
  }

  return (
    <section className="bg-surface-container px-reader-gutter-mobile py-space-sm shadow-inner transition-all duration-300" id="customizer-panel">
      <div className="max-w-reading-column-max mx-auto flex flex-col gap-space-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-xs">
          <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-xl shadow-sm">
            <button
              aria-label="Perkecil Ukuran Huruf"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-ui-label text-ui-label transition-colors"
              onClick={handleFontDec}
            >
              A-
            </button>
            <span className="font-ui-caption text-ui-caption text-on-surface px-1 min-w-[70px] text-center font-medium">
              {fontSizes[currentSizeIdx]}px
            </span>
            <button
              aria-label="Perbesar Ukuran Huruf"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-ui-label text-ui-label transition-colors"
              onClick={handleFontInc}
            >
              A+
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-1">
          <div className="flex items-center justify-between bg-surface-container-lowest p-1 rounded-xl shadow-sm">
            {[
              { label: 'Amiri', font: 'font-arabic-body' },
              { label: 'Scheherazade', font: 'font-arabic-body-scheherazade' },
              { label: 'Isep Misbah', font: 'font-arabic-body-isep-misbah' },
              { label: 'Noto Serif', font: 'font-display-hero' },
            ].map((item) => (
              <button
                key={item.font}
                className={`font-switch-btn flex-1 py-1 px-2 rounded-lg text-center font-ui-caption text-ui-caption transition-colors ${
                  selectedFont === item.font ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'
                }`}
                onClick={() => handleFontChange(item.font)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between bg-surface-container-lowest p-1 rounded-xl shadow-sm gap-1">
            {[
              { label: 'Terang', theme: 'theme-light', color: 'bg-surface border border-outline-variant' },
              { label: 'Sepia', theme: 'theme-sepia', color: 'bg-[#E8DCB8]' },
              { label: 'Malam', theme: 'theme-night', color: 'bg-inverse-surface' },
            ].map((item) => (
              <button
                key={item.theme}
                className={`theme-preset-btn flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg font-ui-caption text-ui-caption transition-all ${
                  selectedTheme === item.theme
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
                onClick={() => handleThemeChange(item.theme)}
              >
                <span className={`w-3 h-3 rounded-full ${item.color} shadow-xs`}></span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReaderCustomizer
