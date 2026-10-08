revoke execute on function public.has_role(uuid, app_role) from anon, public;
grant execute on function public.has_role(uuid, app_role) to authenticated;
revoke execute on function public.update_updated_at_column() from anon, authenticated, public;