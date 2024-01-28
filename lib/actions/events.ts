// import createSupabaseFrontendClient from "../supabase/supabase";
import { createSupabaseAppServerClient } from "../supabase/supabaseAppRouterClient";

// const supabase = createSupabaseFrontendClient();
const supabase = createSupabaseAppServerClient();

export const revalidate = 60;

export async function getEvents() {
  const currentDate = new Date();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gt("date", currentDate.toISOString())
    .order("date", { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
