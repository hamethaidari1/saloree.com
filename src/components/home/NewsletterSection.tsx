import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast.error("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });
    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already subscribed");
      } else {
        console.error("[NewsletterSection] Supabase error:", error);
        toast.error("Couldn't subscribe right now. Please try again.");
      }
      return;
    }

    toast.success("Subscribed! Thanks for joining.");
    setEmail("");
  };

  return (
    <section className="bg-[var(--color-brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white">
          <Mail className="size-5" />
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
            Get new arrivals and deals in your inbox
          </h2>
          <p className="text-white/60 text-sm mt-1">Updates from real Saloree sellers — no spam.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full sm:w-auto flex-col sm:flex-row gap-2 shrink-0"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className="flex-1 sm:w-64 bg-white border border-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-brand)] transition-colors placeholder:text-[var(--color-text-muted)] text-[var(--color-ink)]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-[var(--color-brand)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[var(--color-brand-dark)] transition-colors inline-flex items-center justify-center gap-2 shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)]"
          >
            <span>{submitting ? "Subscribing…" : "Subscribe"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
