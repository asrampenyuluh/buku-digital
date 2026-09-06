import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function DownloadedManuscriptCard({ title, arabicTitle, author, size, meta, badges }) {
  return (
    <div className="group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col gap-space-sm relative overflow-hidden">
      <div className="flex items-start gap-space-sm">
        <div className="w-16 h-20 bg-primary-container rounded-lg overflow-hidden shrink-0 shadow-sm flex items-center justify-center relative">
          <img
            className="w-full h-full object-cover"
            data-alt={meta.alt}
            src={meta.src}
          />
          <span className="absolute bottom-1 right-1 bg-surface/90 text-primary rounded-full px-1 text-[9px] font-bold">
            {size}
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{title}</h2>
            <span
              className="material-symbols-outlined text-[18px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          {arabicTitle && (
            <p
              className="font-arabic-display-mobile text-arabic-display-mobile text-primary leading-none text-right my-0.5"
              dir="rtl"
            >
              {arabicTitle}
            </p>
          )}
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{author}</span>
          <div className="flex items-center gap-2 mt-1">
            {badges.map((badge, idx) => (
              <span key={idx} className="font-ui-caption text-ui-caption text-secondary font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-space-2xs">
        <button
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors px-2 py-1 rounded"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
          <span className="font-ui-caption text-ui-caption font-medium">Hapus</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span className="font-ui-label text-ui-label">Baca Offline</span>
        </button>
      </div>
    </div>
  )
}

function DownloadedManuscriptList() {
  const [manuscripts, setManuscripts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchManuscripts = async () => {
      const { data } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        const formatted = data.map((book) => ({
          title: book.title,
          arabicTitle: book.title_arabic,
          author: book.author,
          size: book.file_size_mb ? `${book.file_size_mb} MB` : '0 MB',
          badges: [
            `${book.category}`,
            book.is_downloaded ? 'Tersimpan' : 'Cloud'
          ],
          meta: {
            alt: `Cover of ${book.title}`,
            src: book.cover_url || '/placeholders/no-cover.svg',
          },
        }))
        setManuscripts(formatted)
      }
      setLoading(false)
    }

    fetchManuscripts()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
        Memuat daftar manuskrip...
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-space-sm" id="downloaded-list">
      {manuscripts.map((manuscript, index) => (
        <DownloadedManuscriptCard key={manuscript.id || index} {...manuscript} />
      ))}
    </div>
  )
}

export default DownloadedManuscriptList
