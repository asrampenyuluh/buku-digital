-- Audit: cek tabel, view, dan data yang tidak terpakai
-- Jalankan di Supabase SQL Editor untuk melihat ringkasan

SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

SELECT schemaname, viewname 
FROM information_schema.views 
WHERE schemaname = 'public'
ORDER BY viewname;
