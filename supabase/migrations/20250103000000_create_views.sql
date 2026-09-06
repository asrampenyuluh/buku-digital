-- =============================================================================
-- CREATE VIEWS: map old tables to new names for app compatibility
-- This allows the app to use manuscripts/sections/readings
-- while the actual data remains in books/chapters/hadiths
-- =============================================================================

-- Drop views if they exist (for reruns)
DROP VIEW IF EXISTS public.manuscripts;
DROP VIEW IF EXISTS public.sections;
DROP VIEW IF EXISTS public.readings;

-- Create manuscript view (maps books table)
CREATE VIEW public.manuscripts AS
SELECT 
  id,
  title,
  title_arabic,
  author,
  author_arabic,
  category,
  cover_url,
  file_size_mb,
  is_downloaded,
  download_path,
  metadata,
  created_at,
  updated_at,
  content_type,
  description,
  tags,
  is_featured,
  is_published
FROM public.books;

-- Create sections view (maps chapters table)
CREATE VIEW public.sections AS
SELECT 
  id,
  book_id AS manuscript_id,
  chapter_number AS section_number,
  title,
  title_arabic,
  description,
  hadiths_count AS readings_count,
  created_at,
  updated_at
FROM public.chapters;

-- Create readings view (maps hadiths table)
CREATE VIEW public.readings AS
SELECT 
  id,
  book_id AS manuscript_id,
  chapter_id AS section_id,
  hadith_number AS reading_number,
  narrator AS speaker_narrator,
  matan_arabic AS arabic_text,
  transliteration,
  matan_translation AS translation,
  grade,
  source,
  notes,
  metadata,
  created_at,
  updated_at
FROM public.hadiths;

-- Grant permissions on views
GRANT SELECT ON public.manuscripts TO authenticated;
GRANT SELECT ON public.sections TO authenticated;
GRANT SELECT ON public.readings TO authenticated;

GRANT INSERT ON public.manuscripts TO authenticated;
GRANT INSERT ON public.sections TO authenticated;
GRANT INSERT ON public.readings TO authenticated;

GRANT UPDATE ON public.manuscripts TO authenticated;
GRANT UPDATE ON public.sections TO authenticated;
GRANT UPDATE ON public.readings TO authenticated;

GRANT DELETE ON public.manuscripts TO authenticated;
GRANT DELETE ON public.sections TO authenticated;
GRANT DELETE ON public.readings TO authenticated;
