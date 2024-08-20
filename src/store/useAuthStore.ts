import { supabase } from "@/lib/supabase";
import { User } from "@/types/supabase-types";
import { Session } from "@supabase/auth-js";
import { create } from "zustand";

interface AuthState {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  init: () => Promise<() => void>;
  signIn: (idToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  init: async () => {
    const handleSession = async (session: Session | null) => {
      if (!session) {
        set({
          session: null,
          isLoading: false,
        });

        return;
      }

      const user = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id)
        .then(({ data, error }) => {
          if (error) {
            return null;
          }

          return data?.[0] ?? null;
        });

      set({
        session,
        user,
        isLoading: false,
      });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  },
  signIn: async (idToken: string) => {
    await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });
  },
  signOut: async () => {
    set({ session: null });
    await supabase.auth.signOut();
  },
  setSession: (session: Session | null) => set({ session }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
