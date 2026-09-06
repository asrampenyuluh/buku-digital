-- Diagnosa: cek tabel dan kolom yang sekarang ada
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

SELECT column_name FROM information_schema.columns 
WHERE table_name = 'sections' AND table_schema = 'public' ORDER BY ordinal_position;

SELECT column_name FROM information_schema.columns 
WHERE table_name = 'manuscripts' AND table_schema = 'public' ORDER BY ordinal_position;
