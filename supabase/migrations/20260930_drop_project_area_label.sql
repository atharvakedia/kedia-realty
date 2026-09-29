-- Remove the free-text "area label" (e.g. "900 - 2,400 sq ft"). It duplicated
-- the plot size range now stored in size_min_sq_yd / size_max_sq_yd.
--
-- Deploy order: the previous app version still writes area_label, so saving a
-- project from the old build fails once this has run. Apply this and deploy the
-- new build back to back.

alter table public.projects drop column if exists area_label;
