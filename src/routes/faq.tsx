import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs — Saloree" },
      {
        name: "description",
        content: "Answers to common questions about shopping and selling on Saloree.",
      },
    ],
  }),
  component: FAQPage,
});

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I track my order?",
    a: (
      <>
        Once you're signed in, open{" "}
        <Link to="/orders" className="font-semibold text-[var(--color-brand)] hover:underline">
          My Orders
        </Link>{" "}
        to see the status of everything you've bought.
      </>
    ),
  },
  {
    q: "How do returns and refunds work?",
    a: (
      <>
        Saloree is a marketplace of independent sellers, so return windows can vary by store. See
        our{" "}
        <Link
          to="/refund-policy"
          className="font-semibold text-[var(--color-brand)] hover:underline"
        >
          Refund Policy
        </Link>{" "}
        for the marketplace-wide minimum, then contact the seller directly from your order.
      </>
    ),
  },
  {
    q: "How do I become a seller on Saloree?",
    a: (
      <>
        Visit{" "}
        <Link to="/seller" className="font-semibold text-[var(--color-brand)] hover:underline">
          Become a Seller
        </Link>{" "}
        to create your store and start listing products.
      </>
    ),
  },
  {
    q: "What payment methods are supported?",
    a: "Payment options are shown at checkout and depend on your region and the store you're buying from.",
  },
  {
    q: "How do I contact support?",
    a: (
      <>
        Email us at{" "}
        <a
          href="mailto:info@saloree.com"
          className="font-semibold text-[var(--color-brand)] hover:underline"
        >
          info@saloree.com
        </a>{" "}
        and we'll get back to you.
      </>
    ),
  },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-[var(--color-ink)]">
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Common questions about shopping and selling on Saloree.
      </p>

      <div className="mt-8 divide-y divide-[var(--color-hairline)] rounded-xl border border-[var(--color-hairline)] bg-white">
        {FAQS.map((item) => (
          <div key={item.q} className="p-5">
            <h2 className="font-heading text-base font-bold text-[var(--color-ink)]">{item.q}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
