-- Run this in the Supabase SQL editor.
--
-- Per-topic calibration model (PRD §4.2): every user carries a band +
-- confidence + sample count + history per topic, replacing the legacy single
-- progress.user_band label. Stored as jsonb so the shape can evolve without a
-- migration each cycle.
--
-- The column is nullable / defaults to '{}'::jsonb because legacy rows
-- predate per-topic state. The client runs migrateLegacy() on load to
-- populate it from user_band + diagnostic_scores.subs.

alter table public.progress
  add column if not exists levels jsonb not null default '{}'::jsonb;
