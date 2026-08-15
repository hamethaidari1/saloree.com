import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Store,
  User,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getPostAuthRedirectPath } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";

const registerSearchSchema = z
  .object({
    error: z.string().optional(),
    redirect: z.string().optional(),
  })
  .passthrough();

const benefitItems = [
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Protect transactions with trusted authentication and encrypted payments.",
  },
  {
    icon: Store,
    title: "Multi-vendor marketplace",
    description: "Sell, fulfill, and grow from one place without disrupting your workflow.",
  },
  {
    icon: Sparkles,
    title: "Build your store without coding",
    description: "Use polished seller tools to launch quickly and stay focused on sales.",
  },
];

export const Route = createFileRoute("/register")({
  validateSearch: (search) => registerSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Register — Saloree" }] }),
  component: Register,
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
  return path.startsWith("/") && !path.startsWith("//");
}

function getPasswordStrength(password: string) {
  if (!password) {
    return {
      score: 0,
      label: "Use 8+ characters with upper/lowercase, a number, and a symbol.",
      color: "bg-slate-200",
      textColor: "text-slate-500",
    };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return {
      score,
      label: "Weak password",
      color: "bg-rose-500",
      textColor: "text-rose-600",
    };
  }

  if (score === 2) {
    return {
      score,
      label: "Fair password",
      color: "bg-orange-500",
      textColor: "text-orange-600",
    };
  }

  if (score === 3) {
    return {
      score,
      label: "Good password",
      color: "bg-amber-500",
      textColor: "text-amber-600",
    };
  }

  return {
    score,
    label: "Strong password",
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
  };
}

function Register() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const { language } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingMode, setLoadingMode] = useState<"email" | "google" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(searchParams.error ?? "");
  }, [searchParams.error]);

  const isLoading = loadingMode !== null;
  const strength = getPasswordStrength(password);

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Uppercase and lowercase letters", valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: "At least one number", valid: /\d/.test(password) },
    { label: "At least one special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMode("email");
    setErrorMsg("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      const message = "Please enter your full name.";
      setErrorMsg(message);
      toast.error(message);
      setLoadingMode(null);
      return;
    }

    if (password.length < 8) {
      const message = "Password must be at least 8 characters long.";
      setErrorMsg(message);
      toast.error(message);
      setLoadingMode(null);
      return;
    }

    const authCallbackUrl = getAuthCallbackUrl(searchParams.redirect);
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        emailRedirectTo: authCallbackUrl || undefined,
        data: { full_name: trimmedName },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoadingMode(null);
      return;
    }

    if (data.session?.user) {
      let redirectTo = searchParams.redirect;
      if (!isValidRedirect(redirectTo)) {
        redirectTo = await getPostAuthRedirectPath(data.session.user.id);
      }
      toast.success("Account created successfully!");
      navigate({ to: redirectTo as any });
      setLoadingMode(null);
      return;
    }

    toast.success("Account created. Please check your email to confirm your address.");
    navigate({
      to: "/login",
      search: {
        success: "Account created. Please check your email to confirm your address.",
        redirect: searchParams.redirect,
      },
    });
    setLoadingMode(null);
  };

  const registerWithGoogle = async () => {
    const redirectTo = getAuthCallbackUrl(searchParams.redirect);
    if (!redirectTo) return;

    setLoadingMode("google");
    setErrorMsg("");

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-69px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
        <section className="hidden lg:flex lg:flex-col lg:justify-between lg:rounded-[32px] lg:border lg:border-white/10 lg:bg-white/8 lg:p-10 lg:text-white lg:shadow-2xl lg:shadow-black/20 lg:backdrop-blur">
          <div className="space-y-8">
            <Logo linked={false} imgClassName="h-10 w-auto object-contain brightness-0 invert" />

            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Premium seller onboarding
              </span>
              <div className="space-y-3">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                  Start selling globally with Saloree
                </h1>
                <p className="max-w-xl text-base leading-7 text-white/70">
                  Create your Saloree account to open a store, manage sales, and offer a more
                  trustworthy checkout experience from day one.
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
                Join a marketplace that helps you build trust, move faster, and grow without
                needing custom code.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[560px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.65)] backdrop-blur sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#E11D48]" />

            <div className="space-y-8">
              <div className="space-y-5 text-center">
                <div className="flex justify-center">
                  <Logo linked={false} imgClassName="h-12 w-auto object-contain" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                    {t("auth_register_title", language) || "Create an account"}
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-6 text-slate-500">
                    Create a secure Saloree account to shop, manage orders, or start building your
                    store.
                  </p>
                </div>
              </div>

              {errorMsg ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMsg}
                </div>
              ) : null}

              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    {t("full_name_label", language) || "Full name"}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#E11D48] focus:ring-4 focus:ring-[#E11D48]/10"
                    />
                  </div>
                </div>

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
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">
                    {t("password_label", language) || "Password"}
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
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

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-slate-700">Password strength</span>
                      <span className={`font-semibold ${strength.textColor}`}>{strength.label}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${(strength.score / 4) * 100}%` }}
                      />
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {passwordChecks.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-xs">
                          <span
                            className={`flex size-4 items-center justify-center rounded-full ${
                              item.valid
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-slate-200 text-slate-400"
                            }`}
                          >
                            <Check className="size-3" />
                          </span>
                          <span className={item.valid ? "text-slate-700" : "text-slate-500"}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      {t("sign_up", language) || "Create account"}
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs leading-6 text-slate-500">
                By creating an account, you agree to our{" "}
                <Link to="/" className="font-semibold text-slate-700 transition hover:text-[#E11D48]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/" className="font-semibold text-slate-700 transition hover:text-[#E11D48]">
                  Privacy Policy
                </Link>
                .
              </p>

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
                onClick={registerWithGoogle}
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
                  {t("have_account", language) || "Already have an account?"}{" "}
                  <Link to="/login" className="font-semibold text-[#E11D48] transition hover:text-[#BE123C]">
                    Sign in
                  </Link>
                </p>
                <p className="text-xs text-slate-400">
                  Need help getting started?{" "}
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
