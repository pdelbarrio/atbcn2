"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../ToggleTheme";
import { DialogInfo } from "../DialogInfo";
import { useRouter } from "next/navigation";
import createSupabaseFrontendClient from "@/lib/supabase/supabase";

export default function Navbar() {
  const [signOutButton, setSignOutButton] = useState(false);
  // const [session, setSession] = useState(null);

  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log("event", event);
      if (session) {
        setSignOutButton(true);
        router.refresh();
      } else {
        setSignOutButton(false);
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
    if (error) throw new Error("Error durante el cierre de sesión");
    router.push("/");
  };

  return (
    <nav className="max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="h-[120px]">
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            <Link href="/" className="font-bold dark:text-glow text-2xl">
              @bcn
            </Link>
          </div>
          <div>
            <DialogInfo />
          </div>
          <div>
            <ModeToggle />
          </div>
          <div className="flex flex-col">
            <Link
              href="/add-event"
              className="bg-card text-background font-bold px-4 py-1 rounded-lg text-base"
            >
              add event
            </Link>
            {signOutButton && (
              <button
                onClick={handleSignout}
                className="bg-card dark:bg-glow text-white dark:text-black text-xs p-2 px-2 mt-2 rounded-lg"
              >
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
