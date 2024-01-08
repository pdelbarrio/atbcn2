"use server";

import { createSupabaseServerClient } from "../supabase";
import { EventType } from "../types";

export async function getEvents() {
  const currentDate = new Date();
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("events")
    .select("*")
    .gt("date", currentDate.toISOString())
    .order("date", { ascending: true });
}
