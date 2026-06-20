import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Saloree" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const { language } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(t("added_to_cart", language) ? "Account created!" : "Account created!");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-6 flex justify-center">
        <Logo imgClassName="h-12 w-auto object-contain" />
      </div>
      <h1 className="text-2xl font-bold">{t("auth_register_title", language)}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("sign_in_account", language) ? "Join Saloree to shop or start selling." : ""}
      </p>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">{t("full_name_label", language)}</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">{t("email_label", language)}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">{t("password_label", language)}</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? "..." : t("sign_up", language)}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">{t("have_account", language)}</p>
    </div>
  );
}
