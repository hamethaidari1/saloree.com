import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      
      if (event === "SIGNED_IN") {
        await loadRoles(s?.user?.id ?? null);
      } else if (event === "SIGNED_OUT") {
        setRoles([]);
        queryClient.clear();
      } else if (event === "TOKEN_REFRESHED") {
        console.log("[auth] Token refreshed");
      } else if (event === "USER_UPDATED") {
        await loadRoles(s?.user?.id ?? null);
      } else if (event === "INITIAL_SESSION") {
        if (s?.user) await loadRoles(s.user.id);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadRoles(data.session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => {
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
