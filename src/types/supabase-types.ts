import { Database } from "@/types/supabase-db-types";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Friends = Database["public"]["Tables"]["friends"]["Row"];
export type FriendInvitation =
  Database["public"]["Tables"]["friend_invitations"]["Row"];
