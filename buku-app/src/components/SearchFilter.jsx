function SearchFilter() {
  return (
    <div className="pt-2">
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">search</span>
        <input
          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded-xl pl-10 pr-10 py-3 focus:outline-none shadow-sm"
          placeholder="Cari bab, tema, atau nomor hadits..."
          type="text"
        />
        <button className="absolute right-3 text-outline hover:text-on-surface transition-colors" title="Filter Pencarian">
          <span className="material-symbols-outlined text-[18px]">tune</span>
        </button>
      </div>
    </div>
  )
}

export default SearchFilter
