-- Run once in Supabase SQL Editor after public.message_likes exists.
-- Visitors can read and add likes without signing in. Undo is disabled.
alter table public.message_likes enable row level security;
do $$
declare existing_policy record;
begin for existing_policy in
select policyname
from pg_policies
where schemaname = 'public'
    and tablename = 'message_likes' loop execute format(
        'drop policy if exists %I on public.message_likes',
        existing_policy.policyname
    );
end loop;
end;
$$;
revoke
update,
    delete on public.message_likes
from anon,
    authenticated;
grant select,
    insert on public.message_likes to anon,
    authenticated;
create policy "Public can read message likes" on public.message_likes for
select to anon,
    authenticated using (true);
create policy "Public can add message likes" on public.message_likes for
insert to anon,
    authenticated with check (voter_id is not null);