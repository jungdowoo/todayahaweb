create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  question text not null,
  quiz_type text not null check (quiz_type in ('OX', 'MULTIPLE')),
  option_1 text not null,
  option_2 text not null,
  option_3 text,
  option_4 text,
  correct_answer text not null,
  short_explanation text not null,
  full_explanation text not null,
  detail_explanation text,
  example_text text,
  misconception_text text,
  aha_point text not null,
  category_id uuid references public.categories(id) on delete set null,
  difficulty text default 'easy' check (difficulty in ('easy', 'normal', 'hard')),
  reading_time integer default 1,
  tags text[] default '{}',
  seo_title text,
  seo_description text,
  interesting_count integer not null default 0,
  is_popular boolean not null default false,
  popular_score integer not null default 0,
  view_count integer default 0,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references public.quizzes(id) on delete cascade,
  selected_answer text not null,
  is_correct boolean not null,
  created_at timestamptz default now()
);

alter table public.quizzes add column if not exists interesting_count integer not null default 0;
alter table public.quizzes add column if not exists is_popular boolean not null default false;
alter table public.quizzes add column if not exists popular_score integer not null default 0;

create index if not exists quizzes_published_at_idx on public.quizzes (published_at desc) where is_published = true;
create index if not exists quizzes_category_idx on public.quizzes (category_id);
create index if not exists quizzes_tags_idx on public.quizzes using gin (tags);
create index if not exists quizzes_interesting_idx on public.quizzes (interesting_count desc, popular_score desc) where is_published = true;

alter table public.categories enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read published quizzes" on public.quizzes for select using (is_published = true);
create policy "Public can create anonymous attempts" on public.quiz_attempts for insert with check (true);

create or replace function public.increment_quiz_interesting(target_quiz_id uuid)
returns table(interesting_count integer, is_popular boolean, popular_score integer)
language sql
security definer
set search_path = public
as $$
  update public.quizzes
  set
    interesting_count = coalesce(public.quizzes.interesting_count, 0) + 1,
    is_popular = coalesce(public.quizzes.interesting_count, 0) + 1 >= 100,
    popular_score = greatest(coalesce(public.quizzes.popular_score, 0), coalesce(public.quizzes.interesting_count, 0) + 1),
    updated_at = now()
  where public.quizzes.id = target_quiz_id
  returning public.quizzes.interesting_count, public.quizzes.is_popular, public.quizzes.popular_score;
$$;

grant execute on function public.increment_quiz_interesting(uuid) to anon, authenticated;
