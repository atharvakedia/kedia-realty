-- Replace "total area (acres)" with a plot size range in square yards.
-- The old total_area_acres column is removed; its values cannot be converted
-- to plot sizes, so existing projects need min/max sizes entered in the admin.
--
-- Deploy order: the previous app version still writes total_area_acres, so
-- saving a project from the old build fails once this has run. Apply this and
-- deploy the new build back to back.

alter table public.projects
  add column if not exists size_min_sq_yd numeric(10, 2) check (size_min_sq_yd >= 0),
  add column if not exists size_max_sq_yd numeric(10, 2) check (size_max_sq_yd >= 0);

alter table public.projects
  drop constraint if exists projects_size_range_check,
  add constraint projects_size_range_check
    check (size_min_sq_yd is null or size_max_sq_yd is null or size_min_sq_yd <= size_max_sq_yd);

alter table public.projects drop column if exists total_area_acres;
