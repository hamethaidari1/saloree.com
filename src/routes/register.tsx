import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { Eye, EyeOff, Loader2, Globe, ShieldCheck, Store, Sparkles } from "lucide-react";
import { z } from "zod";

const registerSearchSchema = z.object({
  error: z.string().optional(),
}).passthrough();

export const Route = createFileRoute("/register")({
  validateSearch: (search) => registerSearchSchema.parse(search),
  head: () => ({ meta: [{ title: "Register — Saloree" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const { language } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    // Avoid hydration mismatch by evaluating window.location.origin only on the client
    setRedirectUrl(`${window.location.origin}/auth/callback`);

    // Set error from redirect if present
    if (searchParams.error) {
      setErrorMsg("Google sign-in failed. Please try again.");
    }
  }, [searchParams.error]);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-200", text: "text-slate-400" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score, label: "Weak (add letters, numbers & special chars)", color: "bg-rose-500", text: "text-rose-500" };
    if (score === 2) return { score, label: "Fair", color: "bg-orange-400", text: "text-orange-500" };
    if (score === 3) return { score, label: "Good", color: "bg-yellow-500", text: "text-yellow-600" };
    return { score, label: "Strong", color: "bg-emerald-500", text: "text-emerald-600" };
  };

  const strength = getPasswordStrength(password);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: name },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    navigate({ to: "/" });
    setLoading(false);
  };

  const registerWithGoogle = async () => {
    if (!redirectUrl) return;
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full">
      {/* Left side benefit panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-[#E11D48] to-[#9F1239] p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        
        {/* Top brand */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span className="bg-white text-[#E11D48] px-2 py-0.5 rounded-md">S</span>
            Saloree
          </Link>
        </div>

        {/* Benefits list */}
        <div className="my-auto space-y-12 relative z-10 max-w-lg">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
              Start selling globally with Saloree
            </h2>
            <p className="mt-4 text-rose-100 text-lg">
              Empower your e-commerce journey with a modern multi-vendor marketplace platform. Built for growth.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1">
                <Globe className="size-6 text-rose-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sell Globally</h3>
                <p className="text-rose-100 text-sm">Reach customers worldwide with localized storefronts and payment options.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1">
                <ShieldCheck className="size-6 text-rose-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure checkout</h3>
                <p className="text-rose-100 text-sm">Every transaction is protected by industry-standard encryption and security protocols.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1">
                <Store className="size-6 text-rose-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Multi-vendor marketplace</h3>
                <p className="text-rose-100 text-sm">Manage products, orders, and clients through our advanced multi-tenant seller dashboards.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mt-1">
                <Sparkles className="size-6 text-rose-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Build your store without coding</h3>
                <p className="text-rose-100 text-sm">Fully customize store themes, pages, and menus in minutes with interactive builders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-rose-200">
          <p>© 2026 Saloree Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Right side Auth Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50/50 sm:p-12">
        <div className="w-full max-w-[440px] space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
          <div className="text-center">
            <div className="mb-6 flex justify-center lg:hidden">
              <Logo imgClassName="h-10 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("auth_register_title", language) || "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Join Saloree to shop or start selling globally today.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-rose-50 border border-rose-100 p-4 text-sm text-rose-600">
              {errorMsg}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                {t("full_name_label", language) || "Full name"}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                {t("email_label", language) || "Email address"}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                {t("password_label", language) || "Password"}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-3.5 pr-11 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Password strength:</span>
                    <span className={`font-medium ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#E11D48] text-white font-medium hover:bg-[#BE123C] active:scale-[0.98] transition-transform duration-100 rounded-lg shadow-sm mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                t("sign_up", language) || "Create account"
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-slate-400 leading-normal">
            By signing up, you agree to our{" "}
            <Link to="/" className="underline hover:text-slate-600">Terms of Service</Link> and{" "}
            <Link to="/" className="underline hover:text-slate-600">Privacy Policy</Link>.
          </p>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400 uppercase">
              <span className="bg-white px-3">Or sign up with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={registerWithGoogle}
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-3 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-transform duration-100 shadow-sm"
          >
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
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-slate-500">
            {t("have_account", language) || "Already have an account?"}{" "}
            <Link to="/login" className="font-semibold text-[#E11D48] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
