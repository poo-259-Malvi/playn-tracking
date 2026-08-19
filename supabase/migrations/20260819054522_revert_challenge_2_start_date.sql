-- Challenge 2.0 actually starts today (Aug 18), not the 17th — revert the earlier fix.
update public.challenges
set start_date = '2026-08-18', end_date = '2026-09-07'
where id = 'c911a103-b48d-477b-a3ad-2a44f77f9322';
