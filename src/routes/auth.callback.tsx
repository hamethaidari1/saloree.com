import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/Logo";
import { getPostAuthRedirectPath } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const callbackSearchSchema = z
  .object({
    code: z.string().optional(),
    error: z.string().optional(),
    error_code: z.string().optional(),
    error_description: z.string().optional(),
    redirect: z.string().optional(),
  })
  .passthrough();

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search) => callbackSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Authenticating — Saloree" }] }),
  component: AuthCallback,
});

function normalizeAuthError(message: string) {
  return decodeURIComponent(message.replace(/\+/g, " ")).trim();
}

function isValidRedirect(path: string | undefined | null): boolean {
  if (!path) return false;
  return path.startsWith("/") && !path.startsWith("//");
}

function AuthCallback() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const [statusText, setStatusText] = useState("Please wait while we complete your secure sign in.");

  useEffect(() => {
    let active = true;

    async function handleCallback() {
      if (typeof window === "undefined") return;

      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code") ?? searchParams.code;
        const rawError =
          url.searchParams.get("error_description") ??
          url.searchParams.get("error") ??
          searchParams.error_description ??
          searchParams.error;

        if (rawError) {
          throw new Error(normalizeAuthError(rawError));
        }

        if (code) {
          setStatusText("Verifying your Google account...");
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }

        setStatusText("Setting up your Saloree session...");
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (!session?.user) {
          throw new Error("We couldn't create your session. Please try signing in again.");
        }

        let redirectTo = url.searchParams.get("redirect") ?? searchParams.redirect;
        if (!isValidRedirect(redirectTo)) {
          redirectTo = await getPostAuthRedirectPath(session.user.id);
        }

        if (!active) return;

        toast.success("Signed in successfully!");
        navigate({ to: redirectTo as any });
      } catch (error) {
        const message =
          error instanceof Error && error.message
            ? normalizeAuthError(error.message)
            : "Google sign-in failed. Please try again.";

        console.error("[auth-callback] OAuth callback failed:", error);

        if (!active) return;
        setStatusText(message);
        toast.error(message);
        navigate({
          to: "/login",
          search: {
            error: message,
          },
        });
      }
    }

    handleCallback();

    return () => {
      active = false;
    };
  }, [navigate, searchParams.code, searchParams.error, searchParams.error_description, searchParams.redirect]);

  return (
    <div className="relative min-h-[calc(100vh-69px)] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_24%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-69px)] max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-[28px] border border-white/70 bg-white/95 p-8 text-center shadow-[0_24px_70px_-28px_rgba(15,23,42,0.65)] backdrop-blur sm:p-10">
          <div className="flex justify-center">
            <Logo linked={false} imgClassName="h-12 w-auto object-contain" />
          </div>

          <div className="mt-8 flex justify-center">
            <div className="rounded-full bg-rose-50 p-4 text-[#E11D48]">
              <Loader2 className="size-8 animate-spin" />
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
            Completing sign in
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">{statusText}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
            <ShieldCheck className="size-4 text-[#E11D48]" />
            Secure authentication powered by Supabase
          </div>
        </div>
      </div>
    </div>
  );
}
