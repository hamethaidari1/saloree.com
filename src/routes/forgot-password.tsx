import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { Loader2, Globe, ShieldCheck, Store, Sparkles, Mail, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Saloree" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const { language } = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    // Avoid SSR/hydration error by getting origin inside useEffect
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/reset-password`);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Please enter your email address.");
      toast.error("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl || undefined,
      });

      if (error) {
        setErrorMsg(error.message);
        toast.error(error.message);
      } else {
        setSuccessMsg("We've sent a password reset link to your email address. Please check your inbox.");
        toast.success("Reset link sent successfully!");
        setEmail("");
      }
    } catch (err: any) {
      const msg = err?.message || "An unexpected error occurred.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
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
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-rose-50 border border-rose-100 p-4 text-sm text-rose-600 space-y-1">
              <p>{errorMsg}</p>
              <p className="text-xs">
                If the problem persists,{" "}
                <a href="mailto:info@saloree.com" className="font-semibold underline">
                  contact our support team
                </a>
                .
              </p>
            </div>
          )}

          {successMsg && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-600">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@saloree.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#E11D48] text-white font-medium hover:bg-[#BE123C] active:scale-[0.98] transition-transform duration-100 rounded-lg shadow-sm"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Sending link...</span>
                </div>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>

          <div className="text-center pt-2 space-y-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="size-3" />
              Back to sign in
            </Link>
            <p className="text-xs text-slate-400">
              Need help?{" "}
              <a
                href="mailto:info@saloree.com"
                className="font-semibold text-slate-600 hover:underline hover:text-[#E11D48] transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
