"use server";

import createSupabaseServerClient from "../supabase";

export default async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}
