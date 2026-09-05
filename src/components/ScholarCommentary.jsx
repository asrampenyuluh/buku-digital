function ScholarCommentary() {
  return (
    <div className="bg-surface-container-high/40 rounded-xl p-space-md flex items-start gap-3 mt-4">
      <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">auto_stories</span>
      <div className="min-w-0">
        <span className="font-ui-label text-ui-label font-bold text-on-surface">Catatan Peneliti Naskah</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Teks naskah ini merujuk kepada cetakan Darul Minhaj tahqiq Dr. Abdullah At-Turki dengan penomoran standar
          internasional Jamharah Al-Hadits.
        </p>
      </div>
    </div>
  )
}

export default ScholarCommentary
