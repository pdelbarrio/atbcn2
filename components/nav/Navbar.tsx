"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../ToggleTheme";
import { DialogInfo } from "../DialogInfo";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import createSupabaseFrontendClient from "@/lib/supabase/supabase";

export default function Navbar() {
  const [signOutButton, setSignOutButton] = useState(false);

  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event: any, session: any) => {
  //     console.log("event", event);
  //     if (session) {
  //       setSignOutButton(true);
  //       router.refresh();
  //     } else {
  //       setSignOutButton(false);
  //       router.refresh();
  //     }
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [supabase]);

  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log("event in navbar", event);
  //   setTimeout(async () => {
  //     // await on other Supabase function here
  //     // this runs right after the callback has finished
  //     if (event === "SIGNED_IN") {
  //       setSignOutButton(true);
  //       router.refresh();
  //     } else if (event === "SIGNED_OUT") {
  //       setSignOutButton(false);
  //       router.refresh();
  //     }
  //   }, 0);
  // });

  //FIXME: Conseguir que el setSignOutButton(true) se ejecute inmediatamente después del login, ahora mismo no se de que depende
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event in navbar", event);
      console.log("session in navbar", session);
      if (event === "SIGNED_IN" || session) {
        setSignOutButton(true);
        router.refresh();
      } else if (event === "SIGNED_OUT") {
        setSignOutButton(false);
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
    if (error) throw new Error("Error durante el cierre de sesión");
    router.push("/");
  };

  return (
    <nav className="max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="flex flex-col justify-start h-[120px]">
        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
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
              className="flex flex-row gap-2 items-center justify-center bg-card text-btvgray font-bold px-4 py-1 rounded-lg text-base"
            >
              afegeix
              <GrAddCircle />
            </Link>
            {signOutButton && (
              <button
                onClick={handleSignout}
                className="flex flex-row gap-2 items-center justify-center bg-btvgray dark:bg-glow font-bold text-white dark:text-black text-xs p-2 px-2 mt-2 rounded-lg"
              >
                SURT
                <MdLogout />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
