-- Goal/activity moves to per-challenge (challenge_participants.goal) since users
-- pick a distinct goal per challenge, not one global goal on their profile.
alter table public.profiles drop column goal;

drop policy if exists "Users can view own profile" on public.profiles;

-- Everyone needs to see everyone else's name/avatar to render the shared
-- logged / not-logged lists, so profiles must be readable by all signed-in users.
create policy "Profiles are viewable by authenticated users"
on public.profiles for select
to authenticated
using ( true );
