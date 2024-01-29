"use server";
import { createSupabaseServerClient } from "../supabase";
import { createServerClient } from "../supabase/supabaseServerClient";

// export const revalidate = 60;

export async function getEvents() {
  const supabase = createSupabaseServerClient();

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
