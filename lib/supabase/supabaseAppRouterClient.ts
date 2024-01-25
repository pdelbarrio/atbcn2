import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseAppServerClient(serverComponent = false) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          //return cookie with the name 'name' here
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          // set the cookie
          if (serverComponent) return;
          cookies().set(name, value, options);
        },
        remove(name, options) {
          // delete the cookie
          if (serverComponent) return;
          cookies().set(name, "", options);
        },
      },
    }
  );
}

export function createSupabaseServerComponentClient() {
  return createSupabaseAppServerClient(true);
}
