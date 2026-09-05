function BookCard({ title, arabicTitle, author, meta, chips, storage, actions }) {
  return (
    <article className="relative flex flex-col sm:flex-row bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-space-sm min-w-0 flex-1">
        <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 shadow-inner bg-surface-container-high flex flex-col justify-between p-1.5">
          <img
            className="w-full h-full object-cover rounded"
            data-alt={meta.alt}
            src={meta.src}
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-between min-w-0 flex-1 pr-1">
          <div>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h4 className="font-headline-sm text-body-reading font-bold text-on-surface truncate">{title}</h4>
                <p className="font-arabic-body text-headline-sm text-secondary leading-tight mt-0.5" dir="rtl">
                  {arabicTitle}
                </p>
              </div>
            </div>
            <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-1 truncate">{author}</p>
          </div>
          <div className="flex items-center flex-wrap gap-1.5 pt-2">
            {chips.map((chip, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-ui-caption text-ui-caption ${
                  chip.variant === 'filled'
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'bg-secondary-container text-on-secondary-container font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-space-xs sm:pt-0 mt-2 sm:mt-0 sm:border-0 border-t border-surface-container">
        <span className="font-ui-caption text-ui-caption text-outline sm:hidden">{storage}</span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg font-ui-label text-ui-label font-medium transition-colors shadow-sm ${
                action.variant === 'primary'
                  ? 'bg-primary text-on-primary hover:bg-primary-container'
                  : 'bg-surface-container hover:bg-surface-container-high text-primary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function BookList() {
  const books = [
    {
      title: 'Riyadhus Shalihin',
      arabicTitle: 'رياض الصالحين',
      author: 'Imam Abu Zakariya An-Nawawi',
      meta: {
        alt: 'Cover of Riyadhus Shalihin book adorned with intricate Islamic gold and deep emerald arabesque geometric interlacing motifs',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0KiUu9XkUgSTNGLRvtknz1j62ECHPuqR86awW14h3xVlc-Z0cm2EiZ9ICvMlHJL_l7x2e-lgrGhFNMsEr5aJKZhPgDeb09icWDylBC6noksdGhvrRNa13VEbWyheI3_f7qVP39W8nd_HFzfp8DIU7UZbnqfOrhfcTlrcvQAxxYVhkWC7nYYP3HzrTuDONwLLLVYVi1cUakBEuP-cSvSd7ffIpuJ95HekdQlW_Sdn7HHCv-5Nc_eGiw',
      },
      chips: [
        { icon: 'format_list_numbered', label: '1,896 Hadits', variant: 'default' },
        { icon: 'check_circle', label: 'Tersimpan', variant: 'filled' },
      ],
      storage: 'Penyimpanan: 12.4 MB',
      actions: [
        { icon: 'book', label: 'Baca', variant: 'primary' },
        { icon: 'delete_outline', label: '', variant: 'danger' },
      ],
    },
    {
      title: 'Al-Arba\'in An-Nawawiyyah',
      arabicTitle: 'الأربعون النووية',
      author: 'Imam Yahya bin Syaraf An-Nawawi',
      meta: {
        alt: 'Cover of Arbain Nawawi book with elegant emerald green manuscript leather texture',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKzvP2tDRyjlcbotukTONNUIMDkl56IHaSl69o-F8Rz9iNWzhiZxVc0lUT8i6QWRIabD463IIW23xqHsKPvIyLFKhZsLw1rIiwcLKnm6i5PMOY-lqRWAIWvGnvex0hF7ZrRcQqzlz5BH1NrzAybfh4qCIr8ykwEVbUoxnHT9Lh4g2kTbuKkdLNKv8jG7uDy9WQmRDGXph7VjX1V-sOkri9zgt73skQx7LiFpiTQwe0vgwKR1zvcLQoJg',
      },
      chips: [
        { icon: 'format_list_numbered', label: '42 Hadits', variant: 'default' },
        { icon: 'check_circle', label: 'Tersimpan', variant: 'filled' },
      ],
      storage: 'Penyimpanan: 1.8 MB',
      actions: [
        { icon: 'book', label: 'Baca', variant: 'primary' },
        { icon: 'delete_outline', label: '', variant: 'danger' },
      ],
    },
    {
      title: 'Safinatun Naja & Taqrib',
      arabicTitle: 'سفينة النجاة ومتن التقريب',
      author: 'Syaikh Salim bin Sumair Al-Hadhrami',
      meta: {
        alt: 'Classical Islamic jurisprudence manuscript book cover for Fiqh Safinatun Naja',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_FX1zOZH3GJblE3_c7n58ZBxzxL-sUe-51V0M4UVmPhVDG3NBp0p-aJ0TpEOdRfaMKM0HNkZUaBNFoPyKVPBgervrDP9ZeBuITy-pni5S30AWRPERk7r2spUbFFHL4KM8G_XQ6ZfoV4DVfCSNMLwbY2L8C_NDt8Loh-1rcoLSZQ8DkgxiMUCkXlvp48AU9V4p-Pf7zqouJyM0tbiR-Jn0mUwHwkXe2aBZtIhY0RyUmKwWiiuE8ETSLg',
      },
      chips: [
        { icon: 'menu_book', label: 'Fiqih Syafi\'i Dasar', variant: 'default' },
        { icon: 'cloud_queue', label: 'Cloud', variant: 'filled' },
      ],
      storage: 'Ukuran: 4.2 MB',
      actions: [{ icon: 'download', label: 'Unduh (4.2 MB)', variant: 'secondary' }],
    },
    {
      title: 'Tafsir Al-Jalalain',
      arabicTitle: 'تفسير الجلالين',
      author: 'Jalaluddin Al-Mahalli & As-Suyuthi',
      meta: {
        alt: 'Cover of classical Tafsir Jalalain Quran commentary book',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_JcYTq9-ovTpRzrJnv3r6TzMz8hXhUebXVw02O1sYWlkSgpd27y94UjOyDWZKphz3pNkqO3MFf8o6rj0lsEip6Tcvdx5FGxOn-Ma8yvG0oxO6t57sYBNm8sc3nzIUKE0AQkRoIKbXOcG62dYayaywkUtPEctzR2BKOnBpX6xxkCvirO9TqygkK_5YZDz99rEPS9zVFjKRhd6dep8mS2F7KoH0F8YTnfPJfwmUF0BgAHRWugjh5X2TGA',
      },
      chips: [
        { icon: 'auto_stories', label: 'Lengkap 30 Juz', variant: 'default' },
        { icon: 'cloud_queue', label: 'Cloud', variant: 'filled' },
      ],
      storage: 'Ukuran: 18.5 MB',
      actions: [{ icon: 'download', label: 'Unduh (18.5 MB)', variant: 'secondary' }],
    },
    {
      title: 'Matn Al-Ajurrumiyyah',
      arabicTitle: 'متن الآجرومية في علم النحو',
      author: 'Abu Abdillah Muhammad bin Ajurrum',
      meta: {
        alt: 'Cover of Matn Al-Ajurrumiyyah Arabic grammar treatise',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIfMy3B87kB0unm3ar5A4DMgJlVYNw68VnilwZkJkY-sQxwzP59L_8n-KPEae7Se1p_T2wgk07Set2Pa0Tit6TB0LQqtkvHfXSaIapSEMsNkzVqc98jIHOFesWulSWabplPQaq3CKv3fmmhVuQI4EEcG4yKqiUS9WaUlhc7oSgP9Ag2aVrbijF0SSYa5370Lu0Ahu9gMZzAZs-fHlXGnygtBEGkcONruiTV2uyOa5JNVE0fpdmIAmcw',
      },
      chips: [
        { icon: 'spellcheck', label: 'Qawa\'id Nahwu', variant: 'default' },
        { icon: 'cloud_queue', label: 'Cloud', variant: 'filled' },
      ],
      storage: 'Ukuran: 2.1 MB',
      actions: [{ icon: 'download', label: 'Unduh (2.1 MB)', variant: 'secondary' }],
    },
  ]

  return (
    <div className="flex flex-col space-y-space-md" id="book-list">
      {books.map((book, index) => (
        <BookCard key={index} {...book} />
      ))}
    </div>
  )
}

export default BookList
