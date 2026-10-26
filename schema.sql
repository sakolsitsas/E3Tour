-- 1. ตารางข้อความ
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (
    char_length(trim(name)) between 1 and 30
  ),
  message text not null check (
    char_length(trim(message)) between 1 and 300
  ),
  created_at timestamptz not null default now()
);
-- 2. ตารางหัวใจ
create table public.message_likes (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  voter_id uuid not null,
  created_at timestamptz not null default now(),
  -- voter_id เดิมกดหัวใจข้อความเดิมซ้ำไม่ได้
  unique (message_id, voter_id)
);
-- 3. เปิด Row Level Security
alter table public.messages enable row level security;
alter table public.message_likes enable row level security;
-- 4. ทุกคนอ่านข้อความได้
create policy "Anyone can read messages" on public.messages for
select to anon,
  authenticated using (true);
-- 5. ทุกคนโพสต์ข้อความได้ โดยจำกัดความยาว
create policy "Anyone can post messages" on public.messages for
insert to anon,
  authenticated with check (
    char_length(trim(name)) between 1 and 30
    and char_length(trim(message)) between 1 and 300
  );
-- 6. ทุกคนอ่านข้อมูลหัวใจได้
create policy "Anyone can read likes" on public.message_likes for
select to anon,
  authenticated using (true);
-- 7. ทุกคนกดหัวใจได้
create policy "Anyone can add a like" on public.message_likes for
insert to anon,
  authenticated with check (true);
-- 8. ดัชนีช่วยให้เรียงข้อความและนับหัวใจเร็วขึ้น
create index messages_created_at_idx on public.messages (created_at desc);
create index message_likes_message_id_idx on public.message_likes (message_id);