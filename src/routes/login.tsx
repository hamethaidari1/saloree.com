import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getPostAuthRedirectPath } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";

const loginSearchSchema = z
  .object({
    error: z.string().optional(),
    success: z.string().optional(),
    redirect: z.string().optional(),
  })
  .passthrough();

const benefitItems = [
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Protect every order with encrypted payments and account security.",
  },
  {
    icon: Store,
    title: "Multi-vendor marketplace",
    description: "Manage products, orders, and customers from one polished dashboard.",
  },
  {
    icon: Sparkles,
    title: "Build your store without coding",
    description: "Launch faster with seller tools designed for teams of any size.",
  },
];

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Login — Saloree" }] }),
  component: Login,
});

function getAuthCallbackUrl(redirect?: string) {
  if (typeof window === "undefined") return "";
  const url = new URL(`${window.location.origin}/auth/callback`);
  if (redirect && isValidRedirect(redirect)) {
    url.searchParams.set("redirect", redirect);
  }
  return url.toString();
}

function isValidRedirect(path: string | undefined | null): boolean {
  if (!path) return false;
  // Only allow internal paths starting with / and not // (to prevent open redirect)
  return path.startsWith("/") && !path.startsWith("//");
}

function Login() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const { language } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingMode, setLoadingMode] = useState<"email" | "google" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrorMsg(searchParams.error ?? "");
    setSuccessMsg(searchParams.success ?? "");
  }, [searchParams.error, searchParams.success]);

  const isLoading = loadingMode !== null;
  const subtitle = useMemo(
    () => t("sign_in_account", language) || "Sign in to manage your account, orders, and store.",
    [language],
  );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMode("email");
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoadingMode(null);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setErrorMsg(userError.message);
      toast.error(userError.message);
      setLoadingMode(null);
      return;
    }

    let redirectTo = searchParams.redirect;
    if (!isValidRedirect(redirectTo)) {
      redirectTo = user ? await getPostAuthRedirectPath(user.id) : "/";
    }

    toast.success("Welcome back! Redirecting...");
    navigate({ to: redirectTo as any });
    setLoadingMode(null);
  };

  const loginWithGoogle = async () => {
    const redirectTo = getAuthCallbackUrl(searchParams.redirect);
    if (!redirectTo) return;

    setLoadingMode("google");
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoadingMode(null);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-69px)] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-69px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
        <section className="hidden lg:flex lg:flex-col lg:justify-between lg:rounded-[32px] lg:border lg:border-white/10 lg:bg-white/8 lg:p-10 lg:text-white lg:shadow-2xl lg:shadow-black/20 lg:backdrop-blur">
          <div className="space-y-8">
            <Logo linked={false} imgClassName="h-10 w-auto object-contain brightness-0 invert" />

            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Trusted marketplace access
              </span>
              <div className="space-y-3">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                  Start selling globally with Saloree
                </h1>
                <p className="max-w-xl text-base leading-7 text-white/70">
                  Sign in to a marketplace designed to help modern brands launch faster, sell
                  securely, and scale across borders with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {benefitItems.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/8 p-4"
              >
                <div className="rounded-2xl bg-white/12 p-3 text-white">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm leading-6 text-white/70">{description}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/12 to-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Globe2 className="size-4" />
                Start selling globally with Saloree
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Reach more customers with a premium storefront, localized checkout, and a
                marketplace built to earn trust.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[520px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.65)] backdrop-blur sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#E11D48]" />

            <div className="space-y-8">
              <div className="space-y-5 text-center">
                <div className="flex justify-center">
                  <Logo linked={false} imgClassName="h-12 w-auto object-contain" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                    {t("auth_login_title", language) || "Welcome back"}
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-6 text-slate-500">{subtitle}</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                  <CheckCircle2 className="size-4 text-[#E11D48]" />
                  Secure sign in with email or Google
                </div>
              </div>

              {errorMsg ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMsg}
                </div>
              ) : null}

              {successMsg ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMsg}
                </div>
              ) : null}

              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    {t("email_label", language) || "Email address"}
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@saloree.com"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#E11D48] focus:ring-4 focus:ring-[#E11D48]/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                      {t("password_label", language) || "Password"}
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-[#E11D48] transition hover:text-[#BE123C]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#E11D48] focus:ring-4 focus:ring-[#E11D48]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-2xl bg-[#E11D48] text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-[#BE123C]"
                >
                  {loadingMode === "email" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      {t("login", language) || "Sign in"}
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingMode === "google" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Redirecting to Google...
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    Continue with Google
                  </>
                )}
              </button>

              <div className="space-y-3 text-center text-sm text-slate-500">
                <p>
                  {t("no_account", language) || "New to Saloree? Sign up"}{" "}
                  <Link to="/register" className="font-semibold text-[#E11D48] transition hover:text-[#BE123C]">
                    Create an account
                  </Link>
                </p>
                <p className="text-xs text-slate-400">
                  Need help accessing your account?{" "}
                  <a
                    href="mailto:info@saloree.com"
                    className="font-semibold text-slate-600 transition hover:text-[#E11D48]"
                  >
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}
