import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/auth-js";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  signIn: (idToken: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  session?: Session | null;
}>({
  signIn: () => Promise.reject(),
  signOut: () => null,
  isLoading: true,
  session: null,
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useSession must be wrapped in a <AuthContextProvider />",
      );
    }
  }

  return value;
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  const signIn = async (idToken: string) => {
    await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });
  };

  const signOut = async () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: signIn,
        signOut: signOut,
        isLoading: isLoading,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
