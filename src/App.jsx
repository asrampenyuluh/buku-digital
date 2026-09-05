import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import CatalogPage from './pages/CatalogPage'
import DownloadsPage from './pages/DownloadsPage'
import ReaderPage from './pages/ReaderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/kitab/:id" element={<DetailPage />} />
        <Route path="/unduhan" element={<DownloadsPage />} />
        <Route path="/terakhir" element={<CatalogPage />} />
        <Route path="/pengaturan" element={<CatalogPage />} />
        <Route path="/baca/:id" element={<ReaderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
