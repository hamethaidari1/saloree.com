import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const callbackSearchSchema = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  error_code: z.string().optional(),
  error_description: z.string().optional(),
}).passthrough();

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search) => callbackSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Authenticating — Saloree" }] }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;

    async function handleCallback() {
      // 2 & 3. Only run OAuth handling on the client side
      if (typeof window === "undefined") return;

      try {
        console.log("[AuthCallback] URL:", window.location.href);

        // Get parameters from both search and hash fragment (since Supabase can return them in hash)
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));

        const error = urlParams.get("error") || hashParams.get("error") || searchParams.error;
        const errorDescription = urlParams.get("error_description") || hashParams.get("error_description") || searchParams.error_description;

        // 4. If URL contains error or error_description, show clean message and redirect to /login
        if (error || errorDescription) {
          const fullMsg = errorDescription || error || "Google authentication failed";
          console.error("Supabase OAuth callback redirect error details:", fullMsg);
          throw new Error(fullMsg);
        }

        const code = urlParams.get("code") || hashParams.get("code") || searchParams.code;
        
        // 5. If URL contains code, call exchangeCodeForSession
        if (code) {
          console.log("[AuthCallback] Code found in URL, exchanging for session...");
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (exchangeError) {
            console.error("Supabase OAuth code exchange error:", exchangeError);
            throw exchangeError;
          }
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          if (!active) return;
          
          console.log("[AuthCallback] Session established for user ID:", session.user.id);
          
          // 6. After success: redirect to /seller if user has seller role, otherwise /
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
          console.warn("[AuthCallback] No active session or code found in URL.");
          navigate({ to: "/" });
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
  }, [navigate, searchParams]);

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
