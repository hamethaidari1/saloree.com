import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Shared layout for the site's legal pages (Terms, Privacy, Refunds). */
export function LegalPageLayout({ title, updated, children }: LegalPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-[var(--color-ink)]">{title}</h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">Last updated: {updated}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--color-ink)] [&_h2]:font-heading [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[var(--color-ink)] [&_p]:text-[var(--color-text-muted)] [&_li]:text-[var(--color-text-muted)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </div>
  );
}
