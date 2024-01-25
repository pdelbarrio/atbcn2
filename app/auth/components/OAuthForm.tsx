"use client";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function OAuthForm() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/add-event`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col w-5/6 mx-auto">
      <button
        onClick={loginWithGoogle}
        className="flex items-center justify-center h-[40px] px-4 border gap-2 bg-white text-slate-700  border-slate-200 dark:border-slate-700 rounded-lg  dark:text-black hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <Image
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={40}
          height={10}
        />
        <span>Inicia sessió amb Google</span>
      </button>
    </div>
  );
}
