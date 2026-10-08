create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- First signed-in account becomes admin when no admin exists yet
create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_first_admin() from anon, public;
grant execute on function public.claim_first_admin() to authenticated;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_slug text not null,
  subcategory text not null,
  name text not null,
  price numeric not null default 0,
  reseller numeric,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "Anyone can view products" on public.products for select to anon, authenticated using (true);
create policy "Admins insert products" on public.products for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update products" on public.products for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete products" on public.products for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.update_updated_at_column() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger products_updated_at before update on public.products for each row execute function public.update_updated_at_column();

create policy "Public read product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));