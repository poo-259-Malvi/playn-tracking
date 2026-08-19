-- First-time visitors (not yet signed in) query as the `anon` role and need to
-- see the active challenge and leaderboard before joining, so read access
-- can't be restricted to `authenticated` only.
drop policy "Challenges are viewable by authenticated users" on public.challenges;
create policy "Challenges are viewable by everyone"
on public.challenges for select
to anon, authenticated
using ( true );

drop policy "Participants are viewable by authenticated users" on public.challenge_participants;
create policy "Participants are viewable by everyone"
on public.challenge_participants for select
to anon, authenticated
using ( true );

drop policy "Goal logs are viewable by authenticated users" on public.goal_logs;
create policy "Goal logs are viewable by everyone"
on public.goal_logs for select
to anon, authenticated
using ( true );

drop policy "Profiles are viewable by authenticated users" on public.profiles;
create policy "Profiles are viewable by everyone"
on public.profiles for select
to anon, authenticated
using ( true );
