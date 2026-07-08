import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Loader2, Globe, ShieldCheck, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — Saloree" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session) {
            setHasSession(true);
          }
          setCheckingSession(false);
        }
      } catch (err) {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    verifySession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        if (event === "PASSWORD_RECOVERY" || session) {
          setHasSession(true);
        } else if (event === "SIGNED_OUT") {
          setHasSession(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match.";
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMsg(error.message);
        toast.error(error.message);
      } else {
        toast.success("Password reset successfully! Logging you out of all sessions. Please sign in with your new password.");
        setSuccessMsg("Your password has been successfully reset. Redirecting you to the login page...");
        
        // Log out first to ensure clean state
        await supabase.auth.signOut();
        
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 3000);
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to reset password.";
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
              Set New Password
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Please enter and confirm your new password below
            </p>
          </div>

          {checkingSession ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="size-8 animate-spin text-[#E11D48]" />
              <p className="text-sm text-slate-500">Verifying recovery session...</p>
            </div>
          ) : !hasSession ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800 flex gap-3">
                <AlertCircle className="size-5 shrink-0 text-amber-600" />
                <div>
                  <h4 className="font-bold">Invalid or Expired Link</h4>
                  <p className="mt-1 text-xs text-amber-700">
                    Your password reset session is invalid or has expired. Please request a new password reset link.
                  </p>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block text-center w-full h-11 py-3 px-4 bg-[#E11D48] text-white font-medium hover:bg-[#BE123C] active:scale-[0.98] transition-transform duration-100 rounded-lg shadow-sm text-sm"
              >
                Request reset link
              </Link>
              <div className="text-center">
                <Link to="/login" className="text-xs font-semibold text-slate-500 hover:text-slate-950 underline">
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="rounded-lg bg-rose-50 border border-rose-100 p-4 text-sm text-rose-600">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-600">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-11 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-all focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
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
                      <span>Updating password...</span>
                    </div>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
