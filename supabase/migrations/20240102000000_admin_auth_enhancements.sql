-- =============================================================================
-- ADMIN & AUTH ENHANCEMENTS
-- =============================================================================

-- Add role and admin flag to profiles
alter table public.profiles
  add column if not exists role text default 'user' check (role in ('user', 'admin'));

alter table public.profiles
  add column if not exists is_admin boolean default false;

-- Helper function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  );
end;
$$ language plpgsql security definer;

-- =============================================================================
-- ENABLE REALTIME FOR CRUD TABLES (opsional, untuk live update)
-- =============================================================================

alter publication supabase_realtime add table public.books;
alter publication supabase_realtime add table public.chapters;
alter publication supabase_realtime add table public.hadiths;
