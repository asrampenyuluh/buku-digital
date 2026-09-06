import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import OfflineStatusCard from '../components/OfflineStatusCard';
import PrimaryActions from '../components/PrimaryActions';
import SectionList from '../components/SectionList';
import ReadingList from '../components/ReadingList';
import ScholarCommentary from '../components/ScholarCommentary';
import { supabase } from '../lib/supabase';

function DetailPage() {
  const { id } = useParams();
  const [manuscript, setManuscript] = useState(null);
  const [sections, setSections] = useState([]);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [bookRes, sectionsRes, readingsRes] = await Promise.all([
        supabase.from('books').select('*').eq('id', id).single(),
        supabase.from('chapters').select('*').eq('book_id', id).order('chapter_number', { ascending: true }),
        supabase.from('hadiths').select('*').eq('book_id', id).order('hadith_number', { ascending: true }),
      ])

      if (bookRes.data) setManuscript(bookRes.data);
      if (sectionsRes.data) setSections(sectionsRes.data);
      if (readingsRes.data) setReadings(readingsRes.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
        <Header />
        <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
          <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">Memuat...</div>
        </main>
      </div>
    );
  }

  if (!manuscript) {
    return (
      <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
        <Header />
        <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
          <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
            Manuskrip tidak ditemukan.
            <br />
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">
              Kembali ke Katalog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-reading text-body-reading text-on-surface flex flex-col antialiased">
      <Header />
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-12">
          <Breadcrumb />
          <div className="px-reader-gutter-mobile space-y-space-md">
            <ManuscriptCover manuscript={manuscript} />
            <OfflineStatusCard />
            <PrimaryActions manuscript={manuscript} />
            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Daftar Bagian</h3>
                <p className="font-ui-caption text-ui-caption text-on-surface-variant">
                  Terstruktur menurut susunan asli
                </p>
              </div>
              <span className="bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full font-ui-caption text-ui-caption font-semibold">
                {sections.length} Bagian
              </span>
            </div>
            <SectionList sections={sections} />
            <ReadingList readings={readings} />
            <ScholarCommentary />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DetailPage;
