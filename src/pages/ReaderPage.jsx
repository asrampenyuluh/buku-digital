import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReaderHeader from '../components/ReaderHeader'
import ReaderContextBar from '../components/ReaderContextBar'
import ReaderCustomizer from '../components/ReaderCustomizer'
import ReadingChamber from '../components/ReadingChamber'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

function ReaderPage() {
  const { id } = useParams()
  const { user, profile, refreshProfile } = useAuth()
  const [showCustomizer, setShowCustomizer] = useState(true)
  const [fontSize, setFontSize] = useState(24)
  const [fontClass, setFontClass] = useState('font-arabic-body')
  const [theme, setTheme] = useState('theme-sepia')
  const [textAlign, setTextAlign] = useState('justify')
  const [reading, setReading] = useState(null)
  const [manuscript, setManuscript] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile) {
      setFontSize(profile.font_size || 24)
      setFontClass(profile.preferred_font || 'font-arabic-body')
      setTheme(profile.preferred_theme || 'theme-sepia')
      setTextAlign(profile.preferred_alignment || 'justify')
    }
  }, [profile])

  useEffect(() => {
    const fetchReading = async () => {
      const { data } = await supabase
        .from('hadiths')
        .select('*, book:books(*)')
        .eq('id', id)
        .single()

      if (data) {
        setReading(data)
        setManuscript(data.book)
      }
      setLoading(false)
    }

    fetchReading()
  }, [id])

  const savePreferences = async (updates) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error
      await refreshProfile()
    } catch (error) {
      console.error('Failed to save preferences:', error)
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

  const handleAlignmentChange = async (alignment) => {
    setTextAlign(alignment)
    await savePreferences({ preferred_alignment: alignment })
  }

  if (loading) {
    return (
      <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
        <ReaderHeader />
        <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
          <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">Memuat bacaan...</div>
        </main>
      </div>
    )
  }

  if (!reading) {
    return (
      <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
        <ReaderHeader />
        <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
          <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
            Bacaan tidak ditemukan.
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <ReaderHeader />
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <ReaderContextBar
            onToggleSettings={() => setShowCustomizer(!showCustomizer)}
            manuscript={manuscript}
            reading={reading}
          />
          {showCustomizer && (
            <ReaderCustomizer
              onFontSizeChange={handleFontSizeChange}
              onFontChange={handleFontChange}
              onThemeChange={handleThemeChange}
              onAlignmentChange={handleAlignmentChange}
              initialFontSize={fontSize}
              initialFont={fontClass}
              initialTheme={theme}
              initialAlignment={textAlign}
            />
          )}
          <ReadingChamber
            fontClass={fontClass}
            theme={theme}
            fontSize={fontSize}
            textAlign={textAlign}
            reading={reading}
            manuscript={manuscript}
          />
        </div>
      </main>
    </div>
  )
}

export default ReaderPage;
