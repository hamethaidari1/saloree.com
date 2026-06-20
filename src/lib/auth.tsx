import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Role = "admin" | "super_admin" | "content_admin" | "seller" | "customer";
type AuthContextValue = {
  user: User | null;
  session: Session | null;
  roles: Role[];
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = async (uid: string | null) => {
    if (!uid) {
      setRoles([]);
      return;
    }
    console.log(`[auth] Fetching user roles for UID: ${uid}`);
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid);

    if (error) {
      console.error(`[auth] Error fetching user roles for UID ${uid}:`, error);
      setRoles([]);
      return;
    }

    const rolesList = (data?.map((r: { role: Role }) => r.role) ?? []) as Role[];
    console.log(`[auth] User roles fetched for UID ${uid}:`, rolesList);

    // If no roles exist for the logged-in user, auto-assign super_admin (fallback to admin)
    if (rolesList.length === 0) {
      console.log(
        `[auth] No roles found for UID ${uid}. Attempting auto-assignment of 'super_admin' role…`,
      );
      const { error: insertError } = await supabase.from("user_roles").insert({
        user_id: uid,
        role: "super_admin" as any,
      });

      if (insertError) {
        console.error(`[auth] Failed to assign 'super_admin' role:`, insertError);
        console.log(`[auth] Attempting fallback assignment of standard 'admin' role…`);
        const { error: fallbackError } = await supabase.from("user_roles").insert({
          user_id: uid,
          role: "admin" as any,
        });

        if (fallbackError) {
          console.error(`[auth] Failed to assign standard 'admin' role:`, fallbackError);
        } else {
          console.log(`[auth] Successfully assigned fallback 'admin' role to UID: ${uid}`);
          rolesList.push("admin");
        }
      } else {
        console.log(`[auth] Successfully assigned 'super_admin' role to UID: ${uid}`);
        rolesList.push("super_admin");
      }
    }

    setRoles(rolesList);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setTimeout(() => loadRoles(s?.user?.id ?? null), 0);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      loadRoles(data.session?.user?.id ?? null).finally(() => setLoading(false));
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
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
