import { useState } from 'react'
import ReaderHeader from '../components/ReaderHeader'
import ReaderContextBar from '../components/ReaderContextBar'
import ReaderCustomizer from '../components/ReaderCustomizer'
import ReadingChamber from '../components/ReadingChamber'

const themeMap = {
  'theme-light': { bg: '#FFFFFF', text: '#1E1B1C' },
  'theme-sepia': { bg: '#F4ECD8', text: '#3A2F2D' },
  'theme-night': { bg: '#1C1917', text: '#E7E2DE' },
}

function ReaderPage() {
  const [showCustomizer, setShowCustomizer] = useState(true)
  const [fontSize, setFontSize] = useState(24)
  const [showHarakat, setShowHarakat] = useState(true)
  const [fontClass, setFontClass] = useState('font-arabic-body')
  const [theme, setTheme] = useState('theme-sepia')

  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <ReaderHeader />
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <ReaderContextBar onToggleSettings={() => setShowCustomizer(!showCustomizer)} />
          {showCustomizer && (
            <ReaderCustomizer
              onFontSizeChange={setFontSize}
              onHarakatToggle={setShowHarakat}
              onFontChange={setFontClass}
              onThemeChange={setTheme}
            />
          )}
          <ReadingChamber
            fontClass={fontClass}
            theme={theme}
            fontSize={fontSize}
            showHarakat={showHarakat}
          />
        </div>
      </main>
    </div>
  )
}

export default ReaderPage
