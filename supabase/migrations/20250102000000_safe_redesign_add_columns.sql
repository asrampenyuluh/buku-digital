-- =============================================================================
-- SAFE REDESIGN: add new columns without renaming existing tables
-- This avoids conflicts with existing data and publications
-- =============================================================================

-- Add new columns to books (keep existing columns)
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS content_type text DEFAULT 'general';
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS author_arabic text;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

-- Add new columns to chapters (keep existing columns)
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS section_number integer;
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS readings_count integer DEFAULT 0;
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS description text;

-- Add new columns to hadiths (keep existing columns)
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS reading_number integer;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS speaker_narrator text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS arabic_text text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS transliteration text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS translation text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS grade text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.hadiths ADD COLUMN IF NOT EXISTS notes text;

-- Update existing data to populate new columns
UPDATE public.books SET 
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

-- Backfill section_number from chapter_number
UPDATE public.chapters SET section_number = chapter_number WHERE section_number IS NULL;

-- Backfill readings data
UPDATE public.hadiths SET 
  reading_number = hadith_number,
  speaker_narrator = narrator,
  arabic_text = matan_arabic,
  translation = matan_translation
  WHERE reading_number IS NULL;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_books_content_type ON public.books(content_type);
CREATE INDEX IF NOT EXISTS idx_books_featured ON public.books(is_featured);
CREATE INDEX IF NOT EXISTS idx_books_published ON public.books(is_published);

-- Update triggers for new columns (drop first if exists to avoid errors)
DROP TRIGGER IF EXISTS set_updated_at ON public.books;
DROP TRIGGER IF EXISTS set_updated_at ON public.chapters;
DROP TRIGGER IF EXISTS set_updated_at ON public.hadiths;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.chapters
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.hadiths
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
