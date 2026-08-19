create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint challenges_end_after_start check (end_date >= start_date)
);

create index challenges_created_by_idx on public.challenges (created_by);

alter table public.challenges enable row level security;

create policy "Challenges are viewable by authenticated users"
on public.challenges for select
to authenticated
using ( true );

create policy "Users can create challenges"
on public.challenges for insert
to authenticated
with check ( (select auth.uid()) = created_by );


create table public.challenge_participants (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  goal text not null,
  joined_at timestamptz not null default now(),
  unique (challenge_id, user_id)
);

create index challenge_participants_user_id_idx on public.challenge_participants (user_id);

alter table public.challenge_participants enable row level security;

create policy "Participants are viewable by authenticated users"
on public.challenge_participants for select
to authenticated
using ( true );

create policy "Users can join a challenge as themselves"
on public.challenge_participants for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can update their own participation"
on public.challenge_participants for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );


create table public.goal_logs (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  logged_date date not null,
  created_at timestamptz not null default now(),
  unique (challenge_id, user_id, logged_date)
);

create index goal_logs_user_id_idx on public.goal_logs (user_id);
create index goal_logs_challenge_date_idx on public.goal_logs (challenge_id, logged_date);

alter table public.goal_logs enable row level security;

create policy "Goal logs are viewable by authenticated users"
on public.goal_logs for select
to authenticated
using ( true );

create policy "Users can log their own goal within the challenge window"
on public.goal_logs for insert
to authenticated
with check (
  (select auth.uid()) = user_id
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
