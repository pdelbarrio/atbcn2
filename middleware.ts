import { NextResponse, type NextRequest } from "next/server";

// import { createSupabaseServerComponentClient } from "./lib/supabase/supabaseAppRouterClient";
import { createSupabaseServerClient } from "./lib/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const url2 = req.nextUrl.clone();
  url.pathname = "/auth";
  url2.pathname = "/add-event";

  const publicUrls = ["/reset"];

  if (publicUrls.includes(req.nextUrl.pathname)) {
    return res;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to /auth if there is no session

    return NextResponse.rewrite(url);
  } else {
    return NextResponse.rewrite(url2);
  }
}

export const config = {
  matcher: ["/add-event", "/auth"],
};
