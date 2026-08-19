-- Challenge 2.0 actually started Monday Aug 17, not the 18th; keep it a 21-day challenge.
update public.challenges
set start_date = '2026-08-17', end_date = '2026-09-06'
where id = 'c911a103-b48d-477b-a3ad-2a44f77f9322';

-- Defense in depth: block logging future dates at the database level too,
-- not just in the UI (users can log past/today dates, never ahead of today).
drop policy "Users can log their own goal within the challenge window" on public.goal_logs;
create policy "Users can log their own goal within the challenge window"
on public.goal_logs for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and logged_date <= current_date
  and exists (
    select 1
    from public.challenge_participants cp
    where cp.challenge_id = goal_logs.challenge_id
      and cp.user_id = (select auth.uid())
  )
  and exists (
    select 1
    from public.challenges c
    where c.id = goal_logs.challenge_id
      and goal_logs.logged_date between c.start_date and c.end_date
  )
);
