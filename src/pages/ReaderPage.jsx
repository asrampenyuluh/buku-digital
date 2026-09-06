import { useState, useEffect } from 'react'
import ReaderHeader from '../components/ReaderHeader'
import ReaderContextBar from '../components/ReaderContextBar'
import ReaderCustomizer from '../components/ReaderCustomizer'
import ReadingChamber from '../components/ReadingChamber'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'


function ReaderPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [showCustomizer, setShowCustomizer] = useState(true)
  const [fontSize, setFontSize] = useState(24)
  const [fontClass, setFontClass] = useState('font-arabic-body')
  const [theme, setTheme] = useState('theme-sepia')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setFontSize(profile.font_size || 24)
      setFontClass(profile.preferred_font || 'font-arabic-body')
      setTheme(profile.preferred_theme || 'theme-sepia')
    }
  }, [profile])

  const savePreferences = async (updates) => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error
      await refreshProfile()
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleFontSizeChange = async (size) => {
    setFontSize(size)
    await savePreferences({ font_size: size })
  }

  const handleFontChange = async (font) => {
    setFontClass(font)
    await savePreferences({ preferred_font: font })
  }

  const handleThemeChange = async (themeName) => {
    setTheme(themeName)
    await savePreferences({ preferred_theme: themeName })
  }

  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <ReaderHeader />
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <ReaderContextBar onToggleSettings={() => setShowCustomizer(!showCustomizer)} />
          {showCustomizer && (
            <ReaderCustomizer
              onFontSizeChange={handleFontSizeChange}
              onFontChange={handleFontChange}
              onThemeChange={handleThemeChange}
              initialFontSize={fontSize}
              initialFont={fontClass}
              initialTheme={theme}
            />
          )}
          <ReadingChamber
            fontClass={fontClass}
            theme={theme}
            fontSize={fontSize}
          />
        </div>
      </main>
    </div>
  )
}

export default ReaderPage
