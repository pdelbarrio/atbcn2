export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  id: number | string;
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
