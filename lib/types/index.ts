import { SupabaseClient } from "@supabase/supabase-js";

export interface EventType {
  id: number;
  name: string;
  description: string | null;
  date: string;
  location: string;
  price: string;
  link: string | null;
  poster: string | null;
  tags: string[] | null;
  validated: boolean;
  completed: boolean;
  created_at: string;
  created_by: number | null;
}

export interface PreviewEventType {
  name: string;
  description: string | null;
  location: string;
  price: string;
  link: string | null;
  poster: string | null;
  tags: string[] | null;
  date: string | null;
  created_by: string | null | undefined;
  // completed: boolean;
  // created_at: string;
}

export interface EventContextType {
  previewEvent: PreviewEventType | null;
  setPreviewEvent: React.Dispatch<
    React.SetStateAction<PreviewEventType | null>
  >;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedPoster: string | null;
  setUploadedPoster: React.Dispatch<React.SetStateAction<string | null>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  supabase: any;
  setCreatedBy: React.Dispatch<React.SetStateAction<string | null>>;
  createdBy: string | null;
}

export interface EventFormType {
  name: string;
  description: string;
  tags: string[];
  location: string;
  price: string;
  link: string;
}

export interface EventFormErrors {
  tags?: string[];
  [key: string]: string | string[] | undefined;
  name?: string;
  description?: string;
  location?: string;
  price?: string;
  link?: string;
}

export interface AuthContextType {
  supabaseclient: SupabaseClient;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export interface BannedUserType {
  id: number;
  mai: string;
}
