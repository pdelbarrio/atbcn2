import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerComponentClient } from "./lib/supabase/supabaseAppRouterClient";

export async function middleware(req: NextRequest) {
  console.log("Enter Middleware");

  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const url2 = req.nextUrl.clone();
  url.pathname = "/auth";
  url2.pathname = "/add-event";

  const supabase = createSupabaseServerComponentClient();
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