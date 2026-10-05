import { createClient } from "@supabase/supabase-js";

// Public configuration from the existing Zentramed website. Never use a service-role key here.
const url = "https://rixnjglaqyoqdchevppv.supabase.co";
const publishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeG5qZ2xhcXlvcWRjaGV2cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTIxMzAsImV4cCI6MjA5OTQyODEzMH0.SR38u3xC_U1V78ROnG14XfdIgGb2iN9Y-YErPfWWNTU";
let client: ReturnType<typeof createClient> | undefined;
export function getSiteAuth() {
  if (!client) client = createClient(url, publishableKey, { auth: { persistSession: true, autoRefreshToken: true } });
  return client;
}
