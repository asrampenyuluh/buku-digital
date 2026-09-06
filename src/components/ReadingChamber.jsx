import { useState, useMemo } from 'react'

const arabicText = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ»`

function ReadingChamber({ fontClass, theme, fontSize }) {
  const [copied, setCopied] = useState(false)

  const themeStyles = useMemo(() => {
    switch (theme) {
      case 'theme-sepia':
        return {
          bg: '#F4ECD8',
          text: '#3A2F2D',
          cardBg: '#FCF8EE',
          badgeBg: '#EADFCA',
          textMuted: '#5D504E',
        }
      case 'theme-night':
        return {
          bg: '#1C1917',
          text: '#E7E2DE',
          cardBg: '#262220',
          badgeBg: '#332D2A',
          textMuted: '#A69B95',
        }
      default:
        return {
          bg: '#FFFFFF',
          text: '#1E1B1C',
          cardBg: '#F8F4ED',
          badgeBg: '#EDE4D8',
          textMuted: '#5C5450',
        }
    }
  }, [theme])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arabicText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable
    }
  }

  return (
    <article
      className="w-full px-reader-gutter-mobile py-space-xl transition-colors duration-500"
      style={{ backgroundColor: themeStyles.bg, color: themeStyles.text }}
      id="reading-chamber"
    >
      <div className="max-w-reading-column-max mx-auto flex flex-col gap-space-lg">
        <div className="flex flex-col items-center justify-center text-center py-space-xs">
          <div className="w-12 h-0.5 bg-[#C5A059]/40 rounded-full mb-3"></div>
          <p
            className="font-arabic-display-mobile text-arabic-display-mobile leading-none tracking-normal select-none"
            dir="rtl"
            style={{ color: theme === 'theme-night' ? '#E7E2DE' : '#2C2220' }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="flex items-center gap-2 mt-3 w-32 justify-center">
            <span className="h-[1px] flex-1 bg-[#C5A059]/30"></span>
            <span className="material-symbols-outlined text-[#C5A059] text-[15px]">auto_stories</span>
            <span className="h-[1px] flex-1 bg-[#C5A059]/30"></span>
          </div>
        </div>
        <div
          className="p-space-md rounded-xl shadow-xs flex flex-col gap-1.5 text-center"
          style={{ backgroundColor: themeStyles.badgeBg }}
        >
          <span
            className="font-ui-caption text-ui-caption uppercase tracking-widest font-bold"
            style={{ color: themeStyles.textMuted }}
          >
            Manuskrip Ilmu • Bagian 1
          </span>
          <h2
            className={`${fontClass} font-bold leading-relaxed`}
            dir="rtl"
            style={{ color: themeStyles.text }}
          >
            بَابُ الْإِخْلَاصِ وَإِحْضَارِ النِّيَّةِ
          </h2>
          <p className="font-body-sm text-body-sm italic" style={{ color: themeStyles.textMuted }}>
            Bab Keikhlasan dan Menghadirkan Niat dalam Segala Perbuatan
          </p>
        </div>
        <div className="relative rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md" style={{ backgroundColor: themeStyles.cardBg }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full font-ui-label text-ui-label flex items-center justify-center font-bold shadow-xs"
                style={{ backgroundColor: themeStyles.badgeBg, color: themeStyles.textMuted }}
              >
                ١
              </span>
              <span className="font-ui-label text-ui-label uppercase tracking-wider font-semibold" style={{ color: themeStyles.textMuted }}>
                Bacaan No. 1
              </span>
            </div>
            <div className="flex items-center gap-1" style={{ color: themeStyles.textMuted }}>
              <button
                aria-label="Salin Teks"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#EADFCA] transition-colors"
                onClick={handleCopy}
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
              </button>
              <button aria-label="Bagikan" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#EADFCA] transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          </div>
          <div
            className={`${fontClass} text-right font-normal select-text transition-all duration-200`}
            dir="rtl"
            id="matan-arabic-container"
            style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 2.5}px`, color: themeStyles.text }}
          >
            <span>{arabicText}</span>
          </div>
          <div className="relative overflow-hidden rounded-xl p-space-sm flex items-center gap-space-sm" style={{ backgroundColor: themeStyles.badgeBg }}>
            <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: themeStyles.cardBg, color: themeStyles.textMuted }}>
              <span className="material-symbols-outlined text-[26px]">psychology_alt</span>
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="font-ui-caption text-ui-caption font-semibold uppercase tracking-wider" style={{ color: themeStyles.textMuted }}>
                Ringkasan
              </span>
              <p className="font-body-sm text-body-sm line-clamp-2" style={{ color: themeStyles.textMuted }}>
                Teks ini merupakan contoh bacaan yang dapat ditampilkan dalam berbagai format dan tema untuk kenyamanan
                pembaca.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-1" style={{ color: themeStyles.textMuted }}>
              <span className="material-symbols-outlined text-[16px]">translate</span>
              <span className="font-ui-caption text-ui-caption uppercase tracking-wider font-semibold">
                Terjemahan Bahasa Indonesia
              </span>
            </div>
            <p className="font-body-reading text-body-reading leading-relaxed text-justify" style={{ color: themeStyles.text }}>
              Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam.
            </p>
            <blockquote
              className="p-space-sm rounded-lg font-body-reading text-body-reading italic"
              style={{ backgroundColor: themeStyles.badgeBg, color: themeStyles.text }}
            >
              "Dengan nama Allah, Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam."
            </blockquote>
          </div>
          <details className="group rounded-xl overflow-hidden transition-all duration-200" style={{ backgroundColor: themeStyles.badgeBg }}>
            <summary className="flex items-center justify-between p-space-sm cursor-pointer select-none" style={{ color: themeStyles.textMuted }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-ui-label text-ui-label font-semibold">
                  Catatan dan Referensi
                </span>
              </div>
              <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-open:rotate-180">expand_more</span>
            </summary>
            <div className="px-space-sm pb-space-sm font-body-sm text-body-sm flex flex-col gap-2" style={{ color: themeStyles.textMuted }}>
              <p>
                <strong>Sumber:</strong> Referensi teks ini disusun menurut standar naskah yang dipercaya dan telah diverifikasi
                oleh para ahli.
              </p>
              <p>
                <strong>Catatan:</strong> Pembaca disarankan untuk merujuk kepada cetakan asli untuk memastikan kebenaran
                teks.
              </p>
            </div>
          </details>
        </div>
        <nav aria-label="Navigasi Bacaan" className="flex items-center justify-between gap-space-xs pt-2">
          <button
            className="opacity-40 cursor-not-allowed flex items-center gap-1 px-3 py-2 rounded-xl font-ui-label text-ui-label transition-colors"
            style={{ backgroundColor: themeStyles.badgeBg, color: themeStyles.textMuted }}
            disabled
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="font-ui-caption text-ui-caption font-semibold" style={{ color: themeStyles.textMuted }}>
              Nomor 1 dari 12
            </span>
            <div className="flex gap-1 mt-1">
              <span className="w-4 h-1.5 rounded-full" style={{ backgroundColor: themeStyles.textMuted }}></span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeStyles.textMuted, opacity: 0.4 }}></span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeStyles.textMuted, opacity: 0.4 }}></span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeStyles.textMuted, opacity: 0.4 }}></span>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary text-on-primary font-ui-label text-ui-label hover:bg-primary-container shadow-sm transition-colors">
            <span className="hidden sm:inline">Berikutnya</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </nav>
      </div>
    </article>
  )
}

export default ReadingChamber
