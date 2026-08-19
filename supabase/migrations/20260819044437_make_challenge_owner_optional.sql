alter table public.challenges alter column created_by drop not null;

insert into public.challenges (name, start_date, end_date)
values ('21 Day Challenge', current_date, current_date + 20);
