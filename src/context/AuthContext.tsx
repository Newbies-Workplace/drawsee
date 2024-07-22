import { createContext, type PropsWithChildren, useContext } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { supabase } from "@/utils/supabase";

const AuthContext = createContext<{
	signIn: (idToken: string) => Promise<void>;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => Promise.reject(),
	signOut: () => null,
	session: null,
	isLoading: false,
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
	const [[isLoading, session], setSession] = useStorageState("session");

	return (
		<AuthContext.Provider
			value={{
				// todo cleanup and add error handling
				signIn: async (idToken: string) => {
					const { data, error } = await supabase.auth.signInWithIdToken({
						provider: "google",
						token: idToken,
					});

					setSession(data.session?.access_token ?? null);
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
