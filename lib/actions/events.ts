import createSupabaseFrontendClient from "../supabase/supabase";

const supabase = createSupabaseFrontendClient();

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
