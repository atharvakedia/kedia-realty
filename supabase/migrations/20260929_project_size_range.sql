-- Replace "total area (acres)" with a plot size range in square yards.
-- Safe to run on the live project: it only adds columns and relaxes the old one.
-- Run this BEFORE deploying the code that reads/writes the new columns.

alter table public.projects
  add column if not exists size_min_sq_yd numeric(10, 2) check (size_min_sq_yd >= 0),
  add column if not exists size_max_sq_yd numeric(10, 2) check (size_max_sq_yd >= 0);

alter table public.projects
  drop constraint if exists projects_size_range_check,
  add constraint projects_size_range_check
    check (size_min_sq_yd is null or size_max_sq_yd is null or size_min_sq_yd <= size_max_sq_yd);

-- The app no longer writes total_area_acres, so it must stop being required.
-- The column is kept (deprecated) so no existing data is lost; drop it later with:
--   alter table public.projects drop column total_area_acres;
alter table public.projects alter column total_area_acres drop not null;
