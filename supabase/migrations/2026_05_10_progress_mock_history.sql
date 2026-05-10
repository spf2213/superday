-- Pedagogy reset: mocks are now the only signal of "level". Each scored turn
-- in a mock interview pushes a row {ts, cat, firm, tech, structure, confidence}
-- into this jsonb array. The dashboard reads last/best from it.
--
-- Run this in the Supabase SQL editor.

alter table public.progress
  add column if not exists mock_history jsonb not null default '[]'::jsonb;
