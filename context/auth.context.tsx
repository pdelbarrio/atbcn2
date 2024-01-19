// "use client";

// import { createContext, useContext, useState } from "react";
// // import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// // import { createSupabaseServerClient } from "@/lib/supabase";
// import { AuthContextType } from "@/lib/types";

// const AuthContext = createContext({} as AuthContextType);

// interface props {
//   children: React.ReactNode;
// }

// export const AuthContextProvider = ({ children }: props) => {
//   // const [supabaseclient] = useState(() => createSupabaseServerClient());

//   return (
//     <AuthContext.Provider
//       value={{
//         supabaseclient,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);
