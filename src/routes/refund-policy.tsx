import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Saloree" },
      { name: "description", content: "Saloree's marketplace-wide refund and return policy." },
    ],
  }),
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <LegalPageLayout title="Refund Policy" updated="September 2026">
      <p>
        Saloree is a marketplace of independent sellers, each of whom fulfills and ships their own
        orders. This policy sets the marketplace-wide minimum standard that applies to every store
        on Saloree; individual sellers may offer more generous terms on their own store pages.
      </p>

      <h2>1. Requesting a refund or return</h2>
      <ul>
        <li>Contact the seller directly from your order details within 14 days of delivery.</li>
        <li>
          Describe the issue (damaged, incorrect, or not as described) and include photos if
          relevant.
        </li>
        <li>The seller will confirm a return, exchange, or refund based on the issue.</li>
      </ul>

      <h2>2. Eligibility</h2>
      <p>
        Items should be unused and in the condition you received them, with original packaging where
        possible. Perishable goods, personal care items, and custom or made-to-order products may be
        excluded from returns unless they arrive damaged or defective.
      </p>

      <h2>3. Timelines</h2>
      <p>
        Once a return is approved, refunds are issued to your original payment method after the
        returned item is received and inspected. Processing times depend on your payment provider
        and are typically reflected within 5–10 business days of approval.
      </p>

      <h2>4. If a seller doesn't respond</h2>
      <p>
        If a seller does not respond to a return or refund request within a reasonable time, contact
        Saloree support and we will help mediate a resolution between you and the seller.
      </p>

      <h2>5. Damaged or missing items</h2>
      <p>
        If an order arrives damaged or an item is missing, report it as soon as possible so the
        seller can arrange a replacement, refund, or store credit.
      </p>

      <h2>6. Contact</h2>
      <p>
        For help with a return or refund, email{" "}
        <a
          href="mailto:info@saloree.com"
          className="font-semibold text-[var(--color-brand)] hover:underline"
        >
          info@saloree.com
        </a>{" "}
        with your order details.
      </p>
    </LegalPageLayout>
  );
}
