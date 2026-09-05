import { NavLink } from 'react-router-dom'

function BottomNav() {
  const baseClasses = 'flex flex-col items-center justify-center gap-1 min-w-[64px] h-12 transition-colors'

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(27,77,62,0.04)]"
      data-active-classes="text-primary font-bold"
    >
      <div className="flex justify-around items-center h-20 px-space-xs max-w-[46rem] mx-auto">
        <NavLink aria-current="page" className={({ isActive }) => `${baseClasses} ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`} data-path="katalog" to="/">
          <span className="material-symbols-outlined text-[24px]">auto_stories</span>
          <span className="font-ui-label text-ui-label">Katalog</span>
        </NavLink>
        <NavLink className={({ isActive }) => `${baseClasses} ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`} data-path="unduhan" to="/unduhan">
          <span className="material-symbols-outlined text-[24px]">offline_pin</span>
          <span className="font-ui-label text-ui-label">Unduhan</span>
        </NavLink>
        <NavLink className={({ isActive }) => `${baseClasses} ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`} data-path="terakhir-dibaca" to="/terakhir">
          <span className="material-symbols-outlined text-[24px]">history_edu</span>
          <span className="font-ui-label text-ui-label">Terakhir</span>
        </NavLink>
        <NavLink className={({ isActive }) => `${baseClasses} ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`} data-path="pengaturan" to="/pengaturan">
          <span className="material-symbols-outlined text-[24px]">tune</span>
          <span className="font-ui-label text-ui-label">Pengaturan</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav
