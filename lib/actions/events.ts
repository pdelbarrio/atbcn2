"use server";
import { createSupabaseServerClient } from "../supabase";
import { createServerClient } from "../supabase/supabaseServerClient";

const supabase = createSupabaseServerClient();
// export const revalidate = 60;

export async function getEvents() {
  const currentDate = new Date();
  const { data, error } = await (await supabase)
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
