-- =============================================================================
-- REDESIGN: General Islamic Manuscript Library
-- Renames: books→manuscripts, chapters→sections, hadiths→readings
-- Adds content_type, tags, and flexible reading support
-- =============================================================================

-- Drop old FK constraints
ALTER TABLE public.downloads DROP CONSTRAINT IF EXISTS downloads_book_id_fkey;
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS reading_progress_book_id_fkey;
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS reading_progress_chapter_id_fkey;
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS reading_progress_hadith_id_fkey;
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_book_id_fkey;
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_hadith_id_fkey;

-- Drop triggers
DROP TRIGGER IF EXISTS set_updated_at ON public.books;
DROP TRIGGER IF EXISTS set_updated_at ON public.chapters;
DROP TRIGGER IF EXISTS set_updated_at ON public.hadiths;

-- Rename tables
ALTER TABLE public.books RENAME TO manuscripts;
ALTER TABLE public.chapters RENAME TO sections;
ALTER TABLE public.hadiths RENAME TO readings;

-- Rename columns in sections
ALTER TABLE public.sections RENAME COLUMN book_id TO manuscript_id;
ALTER TABLE public.sections RENAME COLUMN chapter_number TO section_number;
ALTER TABLE public.sections RENAME COLUMN hadiths_count TO readings_count;

-- Rename columns in readings
ALTER TABLE public.readings RENAME COLUMN book_id TO manuscript_id;
ALTER TABLE public.readings RENAME COLUMN chapter_id TO section_id;
ALTER TABLE public.readings RENAME COLUMN hadith_number TO reading_number;
ALTER TABLE public.readings RENAME COLUMN narrator TO speaker_narrator;
ALTER TABLE public.readings RENAME COLUMN matan_arabic TO arabic_text;
ALTER TABLE public.readings RENAME COLUMN matan_translation TO translation;

-- Update manuscripts structure
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS content_type text default 'general';
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS author_arabic text;
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS is_featured boolean default false;
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS is_published boolean default true;
ALTER TABLE public.manuscripts DROP COLUMN IF EXISTS total_hadiths;
ALTER TABLE public.manuscripts DROP COLUMN IF EXISTS total_chapters;

-- Update downloads
ALTER TABLE public.downloads RENAME COLUMN book_id TO manuscript_id;
ALTER TABLE public.downloads ADD CONSTRAINT downloads_manuscript_id_fkey FOREIGN KEY (manuscript_id) REFERENCES public.manuscripts(id) ON DELETE CASCADE;

-- Update reading_progress
ALTER TABLE public.reading_progress RENAME COLUMN book_id TO manuscript_id;
ALTER TABLE public.reading_progress DROP COLUMN IF EXISTS chapter_id;
ALTER TABLE public.reading_progress DROP COLUMN IF EXISTS hadith_id;
ALTER TABLE public.reading_progress ADD COLUMN IF NOT EXISTS section_id uuid;
ALTER TABLE public.reading_progress ADD COLUMN IF NOT EXISTS reading_id uuid;
ALTER TABLE public.reading_progress ADD CONSTRAINT reading_progress_manuscript_id_fkey FOREIGN KEY (manuscript_id) REFERENCES public.manuscripts(id) ON DELETE CASCADE;
ALTER TABLE public.reading_progress ADD CONSTRAINT reading_progress_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON DELETE CASCADE;
ALTER TABLE public.reading_progress ADD CONSTRAINT reading_progress_reading_id_fkey FOREIGN KEY (reading_id) REFERENCES public.readings(id) ON DELETE CASCADE;

-- Update bookmarks
ALTER TABLE public.bookmarks RENAME COLUMN book_id TO manuscript_id;
ALTER TABLE public.bookmarks RENAME COLUMN hadith_id TO reading_id;
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_manuscript_id_fkey FOREIGN KEY (manuscript_id) REFERENCES public.manuscripts(id) ON DELETE CASCADE;
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_reading_id_fkey FOREIGN KEY (reading_id) REFERENCES public.readings(id) ON DELETE CASCADE;

-- Update unique constraints
ALTER TABLE public.sections DROP CONSTRAINT IF EXISTS sections_book_id_chapter_number_key;
ALTER TABLE public.sections ADD CONSTRAINT sections_manuscript_id_section_number_key UNIQUE (manuscript_id, section_number);

ALTER TABLE public.readings DROP CONSTRAINT IF EXISTS hadiths_book_id_chapter_id_hadith_number_key;
ALTER TABLE public.readings ADD CONSTRAINT readings_manuscript_id_section_id_reading_number_key UNIQUE (manuscript_id, section_id, reading_number);

-- Recreate triggers
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.manuscripts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.readings FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Update indexes
DROP INDEX IF EXISTS idx_books_category;
DROP INDEX IF EXISTS idx_books_created_at;
DROP INDEX IF EXISTS idx_chapters_book_id;
DROP INDEX IF EXISTS idx_hadiths_book_id;
DROP INDEX IF EXISTS idx_hadiths_chapter_id;

CREATE INDEX IF NOT EXISTS idx_manuscripts_category ON public.manuscripts(category);
CREATE INDEX IF NOT EXISTS idx_manuscripts_created_at ON public.manuscripts(created_at desc);
CREATE INDEX IF NOT EXISTS idx_manuscripts_content_type ON public.manuscripts(content_type);
CREATE INDEX IF NOT EXISTS idx_manuscripts_featured ON public.manuscripts(is_featured);
CREATE INDEX IF NOT EXISTS idx_sections_manuscript_id ON public.sections(manuscript_id);
CREATE INDEX IF NOT EXISTS idx_readings_manuscript_id ON public.readings(manuscript_id);
CREATE INDEX IF NOT EXISTS idx_readings_section_id ON public.readings(section_id);

-- Update seed data: manuscripts
UPDATE public.manuscripts SET 
  content_type = CASE 
    WHEN category = 'hadits' THEN 'hadith_collection'
    WHEN category = 'fiqih' THEN 'general'
    WHEN category = 'tafsir' THEN 'general'
    WHEN category = 'bahasa' THEN 'general'
    ELSE 'general'
  END,
  author_arabic = CASE 
    WHEN title = 'Riyadhus Shalihin' THEN 'رياض الصالحين'
    WHEN title = 'Al-Arba''in An-Nawawiyyah' THEN 'الأربعون النووية'
    WHEN title = 'Safinatun Naja & Taqrib' THEN 'سفينة النجاة ومتن التقريب'
    WHEN title = 'Tafsir Al-Jalalain' THEN 'تفسير الجلالين'
    WHEN title = 'Matn Al-Ajurrumiyyah' THEN 'متن الآجرومية في علم النحو'
    ELSE NULL
  END,
  description = metadata->>'description',
  tags = ARRAY[category]
  WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
  );

-- Update seed data: sections (chapters)
UPDATE public.sections SET 
  section_number = chapter_number,
  title_arabic = title_arabic
  WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333'
  );

-- Update seed data: readings (hadiths)
UPDATE public.readings SET 
  reading_number = hadith_number,
  speaker_narrator = narrator,
  arabic_text = matan_arabic,
  translation = matan_translation
  WHERE id IN (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  );

-- Update RLS policies
DROP POLICY IF EXISTS "Books are viewable by everyone" ON public.manuscripts;
DROP POLICY IF EXISTS "Authenticated users can insert books" ON public.manuscripts;
DROP POLICY IF EXISTS "Authenticated users can update books" ON public.manuscripts;
CREATE POLICY "Manuscripts are viewable by everyone" ON public.manuscripts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert manuscripts" ON public.manuscripts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update manuscripts" ON public.manuscripts FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Chapters are viewable by everyone" ON public.sections;
DROP POLICY IF EXISTS "Authenticated users can insert chapters" ON public.sections;
DROP POLICY IF EXISTS "Authenticated users can update chapters" ON public.sections;
CREATE POLICY "Sections are viewable by everyone" ON public.sections FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert sections" ON public.sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update sections" ON public.sections FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Hadiths are viewable by everyone" ON public.readings;
DROP POLICY IF EXISTS "Authenticated users can insert hadiths" ON public.readings;
DROP POLICY IF EXISTS "Authenticated users can update hadiths" ON public.readings;
CREATE POLICY "Readings are viewable by everyone" ON public.readings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert readings" ON public.readings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update readings" ON public.readings FOR UPDATE USING (auth.role() = 'authenticated');

-- Update storage buckets
UPDATE storage.buckets SET name = 'manuscript-covers', id = 'manuscript-covers' WHERE id = 'book-covers';
UPDATE storage.buckets SET name = 'manuscript-files', id = 'manuscript-files' WHERE id = 'book-files';

-- Update storage policies for renamed buckets
DROP POLICY IF EXISTS "Public book covers are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload book covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update book covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete book covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own downloaded files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload book files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update book files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete book files" ON storage.objects;

CREATE POLICY "Public manuscript covers are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'manuscript-covers');
CREATE POLICY "Authenticated users can upload manuscript covers" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'manuscript-covers' and auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update manuscript covers" ON storage.objects
  FOR UPDATE USING (bucket_id = 'manuscript-covers' and auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete manuscript covers" ON storage.objects
  FOR DELETE USING (bucket_id = 'manuscript-covers' and auth.role() = 'authenticated');

CREATE POLICY "Users can view own downloaded files" ON storage.objects
  FOR SELECT USING (bucket_id = 'manuscript-files' and auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Authenticated users can upload manuscript files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'manuscript-files' and auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update manuscript files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'manuscript-files' and auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete manuscript files" ON storage.objects
  FOR DELETE USING (bucket_id = 'manuscript-files' and auth.role() = 'authenticated');
