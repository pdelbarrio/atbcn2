"use client";

import { EventContextType, PreviewEventType } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const GlobalContext = createContext({} as EventContextType);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [previewEvent, setPreviewEvent] = useState<PreviewEventType | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadedPoster, setUploadedPoster] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));
  const [createdBy, setCreatedBy] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        previewEvent,
        setPreviewEvent,
        uploadedPoster,
        setUploadedPoster,
        tags,
        setTags,
        supabase,
        createdBy,
        setCreatedBy,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
