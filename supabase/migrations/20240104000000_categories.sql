-- =============================================================================
-- CATEGORIES TABLE
-- =============================================================================

create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

create policy "Authenticated users can insert categories" on public.categories
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update categories" on public.categories
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete categories" on public.categories
  for delete using (auth.role() = 'authenticated');

create index if not exists idx_categories_slug on public.categories(slug);
create index if not exists idx_categories_sort_order on public.categories(sort_order);

-- Trigger untuk auto update updated_at
create trigger set_updated_at before update on public.categories
  for each row execute procedure public.handle_updated_at();

-- Seed data kategori awal
insert into public.categories (name, slug, description, sort_order) values
  ('Hadits', 'hadits', 'Kumpulan kitab hadits dan akhlak', 1),
  ('Fiqih', 'fiqih', 'Kitab fiqih dan hukum Islam', 2),
  ('Aqidah', 'aqidah', 'Kitab aqidah dan tauhid', 3),
  ('Tafsir', 'tafsir', 'Kitab tafsir Al-Quran', 4),
  ('Bahasa Arab', 'bahasa', 'Kitab bahasa dan nahwu Arab', 5)
on conflict (slug) do nothing;

-- Update existing books untuk menggunakan slug kategori yang sesuai
update public.books set category = 'hadits' where category = 'hadits';
update public.books set category = 'fiqih' where category = 'fiqih';
update public.books set category = 'aqidah' where category = 'aqidah';
update public.books set category = 'tafsir' where category = 'tafsir';
update public.books set category = 'bahasa' where category = 'bahasa';
