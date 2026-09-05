# Maktabah Digital - Aplikasi Buku Digital

Aplikasi web untuk membaca kitab-kitab Islam (turats) dengan fitur offline, teks Arab berharakat, dan katalog koleksi kitab.

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup Lokal

### 1. Clone repository

```bash
git clone <repository-url>
cd buku-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Jalankan SQL migration di `supabase/migrations/20240101000000_initial_schema.sql` melalui Supabase SQL Editor
3. Copy credentials dari Supabase Dashboard (Settings > API)

### 4. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Jalankan development server

```bash
npm run dev
```

## Deploy ke Vercel

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Via Vercel Dashboard

1. Push code ke GitHub/GitLab/Bitbucket
2. Import repository di [Vercel](https://vercel.com)
3. Set environment variables di Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

## Database Schema

### Tables

- **profiles** - Profil pengguna (extends auth.users)
- **books** - Katalog kitab
- **chapters** - Daftar bab per kitab
- **hadiths** - Sub-bab / hadits
- **downloads** - Koleksi unduhan IndexedDB
- **reading_progress** - Progres bacaan pengguna
- **bookmarks** - Penanda hadits

### Storage Buckets

- **book-covers** - Cover image kitab (public)
- **book-files** - File kitab untuk offline reading (private)

## Fitur

- [x] Katalog kitab dengan filter kategori
- [x] Detail kitab dengan daftar bab
- [x] Reader mode teks Arab berharakat
- [x] Customisasi font size, font family, tema
- [x] Toggle harakat on/off
- [x] Offline reading via IndexedDB
- [x] Bookmark hadits
- [x] Audio tilawah
- [x] Reading progress tracking
- [x] Responsive design (mobile-first)
- [x] Bottom navigation

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## License

MIT
