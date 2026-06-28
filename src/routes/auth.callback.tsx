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
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          if (!active) return;
          
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
          // If no session immediately, listen to onAuthStateChange for a brief window
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            if (event === "SIGNED_IN" && currentSession?.user && active) {
              subscription.unsubscribe();
              const { data: roleData } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", currentSession.user.id);
              const roles = roleData?.map((r) => r.role) || [];
              if (roles.includes("seller")) {
                toast.success("Successfully logged in as Seller!");
                navigate({ to: "/seller" });
              } else {
                toast.success("Welcome back!");
                navigate({ to: "/" });
              }
            }
          });

          // Timeout after 6 seconds to prevent hanging
          setTimeout(() => {
            if (active) {
              subscription.unsubscribe();
              setErrorMsg("Authentication session expired or failed. Please try again.");
              toast.error("Authentication failed. Please try signing in again.");
              navigate({ to: "/login" });
            }
          }, 6000);
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        if (active) {
          setErrorMsg(err.message || "An error occurred during authentication.");
          toast.error(err.message || "Authentication failed.");
          navigate({ to: "/login" });
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
