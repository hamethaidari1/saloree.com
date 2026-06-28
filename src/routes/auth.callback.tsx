import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [{ title: "Authenticating — Saloree" }] }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;

    async function handleCallback() {
      // Ensure window is defined (always true inside useEffect, but good practice)
      if (typeof window === "undefined") return;

      try {
        console.log("[AuthCallback] Processing OAuth code exchange for URL:", window.location.href);
        
        // Correctly handle Supabase OAuth code exchange
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          console.error("Supabase OAuth code exchange error:", error);
          throw error;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          if (!active) return;
          
          console.log("[AuthCallback] Session established for user ID:", session.user.id);
          
          // Check roles
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id);
            
          if (roleError) {
            console.error("Error fetching roles during callback:", roleError);
          }
          
          const roles = roleData?.map((r) => r.role) || [];
          if (roles.includes("seller")) {
            toast.success("Successfully logged in as Seller!");
            navigate({ to: "/seller" });
          } else {
            toast.success("Welcome back!");
            navigate({ to: "/" });
          }
        } else {
          throw new Error("No active session found after code exchange.");
        }
      } catch (err: any) {
        // Log full error message to console
        console.error("OAuth callback full error message:", err?.message || err);
        
        if (active) {
          setErrorMsg("Google sign-in failed. Please try again.");
          toast.error("Google sign-in failed. Please try again.");
          navigate({ to: "/login", search: { error: "Google sign-in failed. Please try again." } });
        }
      }
    }

    handleCallback();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <Loader2 className="mx-auto size-10 animate-spin text-[#E11D48]" />
        <h2 className="text-xl font-semibold text-slate-800">Completing sign in</h2>
        <p className="text-sm text-slate-500">
          {errorMsg || "Please wait while we finalize your secure session..."}
        </p>
      </div>
    </div>
  );
}
