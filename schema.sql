-- LINE Photo Vote: initial setup for Supabase
-- Run this in Supabase Dashboard > SQL Editor.
-- This starter is intentionally simple for a small private group.
-- IMPORTANT: anyone with the shared link can see/upload/vote. Do not use for sensitive photos.

create extension if not exists pgcrypto;

create table if not exists public.contests (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'โหวตรูปกลุ่มเพื่อน',
  status text not null default 'active' check (status in ('active','finished')),
  upload_open boolean not null default true,
  voting_open boolean not null default true,
  is_current boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 40),
  storage_path text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  photo_id uuid not null references public.photos(id) on delete cascade,
  voter_token uuid not null,
  created_at timestamptz not null default now(),
  constraint one_vote_per_browser_per_contest unique (contest_id, voter_token)
);

create index if not exists photos_contest_created_idx on public.photos(contest_id, created_at desc);
create index if not exists votes_contest_idx on public.votes(contest_id);
create index if not exists votes_photo_idx on public.votes(photo_id);

alter table public.contests enable row level security;
alter table public.photos enable row level security;
alter table public.votes enable row level security;

-- Anyone with the link can read contest settings, gallery, and votes.
drop policy if exists "public can read contests" on public.contests;
create policy "public can read contests" on public.contests for select using (true);

drop policy if exists "public can read photos" on public.photos;
create policy "public can read photos" on public.photos for select using (true);

drop policy if exists "public can upload photo metadata while open" on public.photos;
create policy "public can upload photo metadata while open" on public.photos
for insert with check (
  exists (
    select 1 from public.contests c
    where c.id = contest_id and c.is_current = true and c.upload_open = true and c.status = 'active'
  )
);

drop policy if exists "public can read votes" on public.votes;
create policy "public can read votes" on public.votes for select using (true);

drop policy if exists "public can vote while open" on public.votes;
create policy "public can vote while open" on public.votes
for insert with check (
  exists (
    select 1 from public.contests c
    where c.id = contest_id and c.is_current = true and c.voting_open = true and c.status = 'active'
  )
  and exists (
    select 1 from public.photos p
    where p.id = photo_id and p.contest_id = contest_id
  )
);

-- Storage bucket: public read, uploads allowed only under the current contest folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('contest-photos', 'contest-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "public can view contest photos" on storage.objects;
create policy "public can view contest photos" on storage.objects
for select using (bucket_id = 'contest-photos');

drop policy if exists "public can upload contest photos" on storage.objects;
create policy "public can upload contest photos" on storage.objects
for insert with check (
  bucket_id = 'contest-photos'
  and exists (
    select 1 from public.contests c
    where c.id::text = (storage.foldername(name))[1]
      and c.is_current = true and c.upload_open = true and c.status = 'active'
  )
);

-- Create the first activity if none exists.
insert into public.contests (title, is_current, upload_open, voting_open, status)
select 'โหวตรูปกลุ่มเพื่อน - รอบที่ 1', true, true, true, 'active'
where not exists (select 1 from public.contests where is_current = true);

-- NOTE: This SQL intentionally has no public UPDATE/DELETE policies.
-- To close voting or start a new round, use the Supabase Table Editor as the project owner.
