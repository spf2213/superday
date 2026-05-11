-- Networking CRM: per-user contact list with a touches log.
--
-- One row per person the candidate is networking with. The touches column
-- is an append-only jsonb array of interactions ({at, kind, note}) so we
-- avoid a second table at this scale. "Last touch" is derived client-side
-- from the latest .at; "next action" is an explicit date the user sets.
--
-- Run this in the Supabase SQL editor.

create table if not exists public.networking_contacts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  firm            text,
  role            text,
  email           text,
  linkedin_url    text,
  how_met         text,
  status          text not null default 'to_reach_out'
                  check (status in (
                    'to_reach_out','outreach_sent','replied',
                    'scheduled','met','followed_up','dormant'
                  )),
  next_action_at  date,
  notes           text,
  touches         jsonb not null default '[]'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists networking_contacts_user_next_action_idx
  on public.networking_contacts(user_id, next_action_at);

alter table public.networking_contacts enable row level security;

drop policy if exists "networking_contacts_self_all" on public.networking_contacts;
create policy "networking_contacts_self_all"
  on public.networking_contacts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at fresh on every write so the client can sort by recency.
create or replace function public.touch_networking_contacts_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists networking_contacts_updated_at on public.networking_contacts;
create trigger networking_contacts_updated_at
  before update on public.networking_contacts
  for each row execute function public.touch_networking_contacts_updated_at();
