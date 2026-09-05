-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =============================================================================
-- PROFILES (extends auth.users)
-- =============================================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  preferred_font text default 'font-arabic-body',
  preferred_theme text default 'theme-sepia',
  font_size integer default 24,
  show_harakat boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- =============================================================================
-- BOOKS (katalog kitab)
-- =============================================================================
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  title_arabic text not null,
  author text not null,
  author_arabic text,
  category text not null,
  cover_url text,
  total_hadiths integer default 0,
  total_chapters integer default 0,
  file_size_mb numeric default 0,
  is_downloaded boolean default false,
  download_path text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.books enable row level security;

create policy "Books are viewable by everyone" on public.books
  for select using (true);

create policy "Authenticated users can insert books" on public.books
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update books" on public.books
  for update using (auth.role() = 'authenticated');

-- =============================================================================
-- CHAPTERS (daftar bab)
-- =============================================================================
create table public.chapters (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books(id) on delete cascade not null,
  chapter_number integer not null,
  title text not null,
  title_arabic text not null,
  description text,
  hadiths_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(book_id, chapter_number)
);

alter table public.chapters enable row level security;

create policy "Chapters are viewable by everyone" on public.chapters
  for select using (true);

create policy "Authenticated users can insert chapters" on public.chapters
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update chapters" on public.chapters
  for update using (auth.role() = 'authenticated');

-- =============================================================================
-- HADITHS (sub-bab / hadits)
-- =============================================================================
create table public.hadiths (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books(id) on delete cascade not null,
  chapter_id uuid references public.chapters(id) on delete cascade not null,
  hadith_number integer not null,
  narrator text,
  matan_arabic text not null,
  matan_translation text,
  grade text,
  source text,
  reference text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(book_id, chapter_id, hadith_number)
);

alter table public.hadiths enable row level security;

create policy "Hadiths are viewable by everyone" on public.hadiths
  for select using (true);

create policy "Authenticated users can insert hadiths" on public.hadiths
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update hadiths" on public.hadiths
  for update using (auth.role() = 'authenticated');

-- =============================================================================
-- DOWNLOADS ( koleksi unduhan IndexedDB )
-- =============================================================================
create table public.downloads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  file_size_mb numeric not null,
  storage_path text,
  is_complete boolean default false,
  last_synced_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, book_id)
);

alter table public.downloads enable row level security;

create policy "Users can view own downloads" on public.downloads
  for select using (auth.uid() = user_id);

create policy "Users can insert own downloads" on public.downloads
  for insert with check (auth.uid() = user_id);

create policy "Users can update own downloads" on public.downloads
  for update using (auth.uid() = user_id);

create policy "Users can delete own downloads" on public.downloads
  for delete using (auth.uid() = user_id);

-- =============================================================================
-- READING_PROGRESS ( progres bacaan )
-- =============================================================================
create table public.reading_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  chapter_id uuid references public.chapters(id) on delete cascade,
  hadith_id uuid references public.hadiths(id) on delete cascade,
  progress_percent integer default 0,
  last_read_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, book_id)
);

alter table public.reading_progress enable row level security;

create policy "Users can view own reading progress" on public.reading_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own reading progress" on public.reading_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own reading progress" on public.reading_progress
  for update using (auth.uid() = user_id);

create policy "Users can delete own reading progress" on public.reading_progress
  for delete using (auth.uid() = user_id);

-- =============================================================================
-- BOOKMARKS ( penanda hadits )
-- =============================================================================
create table public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  hadith_id uuid references public.hadiths(id) on delete cascade not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, hadith_id)
);

alter table public.bookmarks enable row level security;

create policy "Users can view own bookmarks" on public.bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert own bookmarks" on public.bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can update own bookmarks" on public.bookmarks
  for update using (auth.uid() = user_id);

create policy "Users can delete own bookmarks" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- =============================================================================
-- STORAGE ( untuk cover dan file kitab )
-- =============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'book-covers',
  'book-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'book-files',
  'book-files',
  false,
  52428800,
  array['application/pdf', 'application/epub+zip', 'application/zip']
) on conflict (id) do nothing;

-- Storage policies for book-covers
create policy "Public book covers are viewable by everyone" on storage.objects
  for select using (bucket_id = 'book-covers');

create policy "Authenticated users can upload book covers" on storage.objects
  for insert with check (bucket_id = 'book-covers' and auth.role() = 'authenticated');

create policy "Authenticated users can update book covers" on storage.objects
  for update using (bucket_id = 'book-covers' and auth.role() = 'authenticated');

create policy "Authenticated users can delete book covers" on storage.objects
  for delete using (bucket_id = 'book-covers' and auth.role() = 'authenticated');

-- Storage policies for book-files
create policy "Users can view own downloaded files" on storage.objects
  for select using (bucket_id = 'book-files' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Authenticated users can upload book files" on storage.objects
  for insert with check (bucket_id = 'book-files' and auth.role() = 'authenticated');

create policy "Authenticated users can update book files" on storage.objects
  for update using (bucket_id = 'book-files' and auth.role() = 'authenticated');

create policy "Authenticated users can delete book files" on storage.objects
  for delete using (bucket_id = 'book-files' and auth.role() = 'authenticated');

-- =============================================================================
-- INDEXES ( untuk performa query )
-- =============================================================================
create index if not exists idx_books_category on public.books(category);
create index if not exists idx_books_created_at on public.books(created_at desc);
create index if not exists idx_chapters_book_id on public.chapters(book_id);
create index if not exists idx_hadiths_book_id on public.hadiths(book_id);
create index if not exists idx_hadiths_chapter_id on public.hadiths(chapter_id);
create index if not exists idx_downloads_user_id on public.downloads(user_id);
create index if not exists idx_reading_progress_user_id on public.reading_progress(user_id);
create index if not exists idx_reading_progress_book_id on public.reading_progress(book_id);
create index if not exists idx_bookmarks_user_id on public.bookmarks(user_id);
create index if not exists idx_bookmarks_hadith_id on public.bookmarks(hadith_id);

-- =============================================================================
-- TRIGGERS ( auto update updated_at )
-- =============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

create trigger set_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at before update on public.books
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at before update on public.chapters
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at before update on public.hadiths
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at before update on public.reading_progress
  for each row execute procedure public.handle_updated_at();

-- =============================================================================
-- SEED DATA ( contoh data awal )
-- =============================================================================
insert into public.books (id, title, title_arabic, author, category, total_hadiths, total_chapters, file_size_mb, metadata)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Riyadhus Shalihin',
    'رياض الصالحين',
    'Imam Abu Zakariya An-Nawawi',
    'hadits',
    1896,
    19,
    12.4,
    '{"description": "Kumpulan hadits pilihan tentang akhlak dan hikmah", "publisher": "Darul Minhaj", "year": 676}'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Al-Arba''in An-Nawawiyyah',
    'الأربعون النووية',
    'Imam Yahya bin Syaraf An-Nawawi',
    'hadits',
    42,
    1,
    1.8,
    '{"description": "40 hadits pokok agama", "publisher": "Darul Minhaj", "year": 676}'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Safinatun Naja & Taqrib',
    'سفينة النجاة ومتن التقريب',
    'Syaikh Salim bin Sumair Al-Hadhrami',
    'fiqih',
    0,
    0,
    4.2,
    '{"description": "Matn fiqih syafi''i dasar", "publisher": "Maktabah Al-Hadramiyah", "year": 2020}'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Tafsir Al-Jalalain',
    'تفسير الجلالين',
    'Jalaluddin Al-Mahalli & As-Suyuthi',
    'tafsir',
    0,
    0,
    18.5,
    '{"description": "Tafsir ringkas 30 juz", "publisher": "Dar Al-Hadith", "year": 2018}'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Matn Al-Ajurrumiyyah',
    'متن الآجرومية في علم النحو',
    'Abu Abdillah Muhammad bin Ajurrum',
    'bahasa',
    0,
    0,
    2.1,
    '{"description": "Qawa''id nahwu dasar", "publisher": "Dar Al-Kutub Al-Ilmiyyah", "year": 2015}'
  )
on conflict (id) do nothing;

-- Seed chapters for Riyadhus Shalihin
insert into public.chapters (id, book_id, chapter_number, title, title_arabic, description, hadiths_count)
values
  ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 1, 'Keikhlasan dan Menghadirkan Niat', 'الإِخْلَاصُ وَإِحْضَارُ النِّيَّةِ', 'Bab tentang keikhlasan dan niat', 12),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 2, 'Pintu Taubat', 'بَابُ التَّوْبَةِ', 'Bab tentang taubat', 18),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 3, 'Pintu Kesabaran', 'بَابُ الصَّبْرِ', 'Bab tentang kesabaran', 29)
on conflict (id) do nothing;

-- Seed hadiths for chapter 1
insert into public.hadiths (id, book_id, chapter_id, hadith_number, narrator, matan_arabic, matan_translation, grade, source)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    1,
    'Amirul Mukminin Umar bin Khattab',
    'عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ»',
    'Innamal a''maalu bin-niyyaat...',
    'Shahih Al-Bukhari & Muslim',
    'HR. Bukhari no. 1 & Muslim no. 1907'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    2,
    'Ummul Mukminin Aisyah r.a.',
    'حَدَّثَتْنَا عَائِشَةُ أُمُّ الْمُؤْمِنِينَ أَنَّهَا سَمِعَتْ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ»',
    'Yaghzuu jaisyul ka''bah...',
    'Muttafaqun ''Alaih',
    'HR. Bukhari & Muslim'
  )
on conflict (id) do nothing;
