"use client";

import { createContext, useContext, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { AuthContextType } from "@/lib/types";

const AuthContext = createContext({} as AuthContextType);

interface props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
  const [supabaseclient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <AuthContext.Provider
      value={{
        supabaseclient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
