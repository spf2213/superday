-- In-app feedback collection for the closed beta. Authed users can insert
-- their own row; no one but the service role can read, so users can't see
-- each other's submissions. Read it back via the Supabase dashboard or a
-- service-role query.

create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  body       text not null check (length(body) between 1 and 4000),
  context    text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists feedback_created_at_idx
  on public.feedback (created_at desc);

alter table public.feedback enable row level security;

-- A user can insert their own feedback, nothing else.
drop policy if exists "feedback_self_insert" on public.feedback;
create policy "feedback_self_insert"
  on public.feedback
  for insert
  with check (auth.uid() = user_id);
