import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type Role = "admin" | "super_admin" | "content_admin" | "seller" | "customer";
export type AuthRedirectPath = "/seller" | "/";
type AuthContextValue = {
  user: User | null;
  session: Session | null;
  roles: Role[];
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Supabase auth-js resolves its OWN internal `initializePromise` from inside
// `_recoverAndRefresh()`, which — for a still-valid session found in
// storage — synchronously calls every `onAuthStateChange` subscriber (with a
// SIGNED_IN event) and awaits each one before that promise can resolve.
// `getSession()` (and therefore any `supabase.from(...)`/`.rpc(...)` call,
// since those fetch the access token via `getSession()` internally) starts
// by awaiting that SAME `initializePromise`. So calling one of those,
// directly or indirectly, synchronously inside an onAuthStateChange
// callback deadlocks: the callback can't finish until the nested call
// finishes, and the nested call can't finish until the callback (as part of
// the promise it's blocking) finishes. Deferring with a macrotask lets the
// callback return immediately, so initializePromise can resolve, before the
// deferred code makes its own Supabase call.
const DEFERRED_ROLE_LOAD_EVENTS = new Set(["SIGNED_IN", "INITIAL_SESSION", "USER_UPDATED"]);

// Safety net: even with the fix above, never let a stalled network request
// or an unexpected future regression hang the whole app on the loading
// screen — fail open to "not loading" after a few seconds so protected
// routes fall back to their normal signed-out/redirect behavior instead of
// spinning forever.
const AUTH_INIT_TIMEOUT_MS = 8000;

export async function getPostAuthRedirectPath(userId: string): Promise<AuthRedirectPath> {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);

  if (error) {
    console.error("[auth] Failed to resolve post-auth redirect path:", error);
    return "/";
  }

  const rolesList = (data?.map((item: { role: Role }) => item.role) ?? []) as Role[];
  return rolesList.includes("seller") ? "/seller" : "/";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const loadRoles = async (uid: string | null) => {
    if (!uid) {
      setRoles([]);
      return;
    }
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid);

    if (error) {
      console.error(`[auth] Error fetching user roles:`, error);
      setRoles([]);
      return;
    }

    const rolesList = (data?.map((r: { role: Role }) => r.role) ?? []) as Role[];
    setRoles(rolesList);
  };

  useEffect(() => {
    let settled = false;
    const finishInitialLoad = () => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    };

    const safetyTimer = setTimeout(() => {
      if (!settled) {
        console.error(
          "[auth] Session check did not finish within the expected time — proceeding without waiting further.",
        );
        finishInitialLoad();
      }
    }, AUTH_INIT_TIMEOUT_MS);

    // The callback itself must stay synchronous (no awaited Supabase calls)
    // — see the comment on DEFERRED_ROLE_LOAD_EVENTS above for why.
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setUser(s?.user ?? null);

      if (event === "SIGNED_OUT") {
        setRoles([]);
        queryClient.clear();
        finishInitialLoad();
        return;
      }

      if (event === "TOKEN_REFRESHED" || event === "PASSWORD_RECOVERY") {
        return;
      }

      if (!DEFERRED_ROLE_LOAD_EVENTS.has(event)) {
        return;
      }

      const uid = s?.user?.id ?? null;
      setTimeout(() => {
        loadRoles(uid).finally(() => {
          // INITIAL_SESSION is guaranteed to fire exactly once per
          // subscription (with or without a user) and is the correct
          // signal that the initial auth check is complete.
          if (event === "INITIAL_SESSION") {
            finishInitialLoad();
          }
        });
      }, 0);
    });

    return () => {
      clearTimeout(safetyTimer);
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      queryClient.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("[auth] Sign out error:", error);
      window.location.href = "/login";
    }
  };
  const refreshRoles = async () => loadRoles(user?.id ?? null);

  return (
    <AuthContext.Provider value={{ user, session, roles, loading, signOut, refreshRoles }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
