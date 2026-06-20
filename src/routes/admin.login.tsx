import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Saloree" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      console.error("[AdminLogin] Supabase sign-in error:", error);
      return toast.error(error.message);
    }

    toast.success("Welcome to Saloree Control Panel!");
    navigate({ to: "/saloree-control/content" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border bg-card p-8 shadow-soft">
        <div className="mb-6 flex justify-center">
          <Logo imgClassName="h-14 w-auto object-contain" />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Control Panel Login</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to manage Saloree website content.
          </p>
        </div>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-1.5 text-sm">
            <label htmlFor="email" className="font-semibold text-muted-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="admin@saloree.com"
            />
          </div>
          <div className="grid gap-1.5 text-sm">
            <label htmlFor="pass" className="font-semibold text-muted-foreground">
              Password
            </label>
            <input
              id="pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
