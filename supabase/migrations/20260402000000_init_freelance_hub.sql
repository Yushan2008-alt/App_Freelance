create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  profession text,
  default_currency char(3) not null default 'IDR',
  language text not null default 'id',
  timezone text not null default 'Asia/Jakarta',
  tax_country text,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  company text,
  address text,
  country text,
  currency char(3) not null default 'IDR',
  notes text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'active', 'completed', 'archived')),
  value numeric(14,2) not null default 0,
  currency char(3) not null default 'IDR',
  start_date date,
  deadline date,
  created_at timestamptz not null default now()
);

create table if not exists public.scope_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.time_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  description text,
  start_time timestamptz,
  end_time timestamptz,
  duration_minutes integer not null default 0 check (duration_minutes >= 0),
  is_billable boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text not null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled')),
  issue_date date not null,
  due_date date not null,
  subtotal numeric(14,2) not null default 0,
  tax_rate numeric(5,2) not null default 0,
  tax_amount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  currency char(3) not null default 'IDR',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  description text not null,
  amount numeric(14,2) not null default 0,
  currency char(3) not null default 'IDR',
  category text not null default 'other' check (category in ('software', 'hardware', 'marketing', 'office', 'travel', 'other')),
  receipt_url text,
  date date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.change_orders (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  additional_value numeric(14,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists idx_clients_user_id on public.clients(user_id);
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_projects_client_id on public.projects(client_id);
create index if not exists idx_time_entries_user_id on public.time_entries(user_id);
create index if not exists idx_time_entries_project_id on public.time_entries(project_id);
create index if not exists idx_invoices_user_id on public.invoices(user_id);
create index if not exists idx_invoices_client_id on public.invoices(client_id);
create index if not exists idx_expenses_user_id on public.expenses(user_id);
create index if not exists idx_change_orders_project_id on public.change_orders(project_id);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.scope_items enable row level security;
alter table public.time_entries enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.expenses enable row level security;
alter table public.change_orders enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id);

create policy "clients_crud_own"
on public.clients
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "projects_crud_own"
on public.projects
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "scope_items_access_own_project"
on public.scope_items
for all
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
);

create policy "time_entries_crud_own"
on public.time_entries
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "invoices_crud_own"
on public.invoices
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "invoice_items_access_own_invoice"
on public.invoice_items
for all
using (
  exists (
    select 1
    from public.invoices i
    where i.id = invoice_id and i.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.invoices i
    where i.id = invoice_id and i.user_id = auth.uid()
  )
);

create policy "expenses_crud_own"
on public.expenses
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "change_orders_access_own_project"
on public.change_orders
for all
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
);
