import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Saloree" },
      {
        name: "description",
        content: "The terms and conditions for using the Saloree marketplace.",
      },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" updated="September 2026">
      <p>
        These Terms of Service ("Terms") govern your access to and use of Saloree, a multi-vendor
        marketplace that connects independent sellers with buyers. By creating an account, browsing,
        or making a purchase on Saloree, you agree to these Terms.
      </p>

      <h2>1. The marketplace model</h2>
      <p>
        Saloree hosts stores operated by independent sellers. Each seller is responsible for the
        accuracy of their own product listings, pricing, and inventory. Saloree facilitates
        discovery, checkout, and payment processing, but sellers — not Saloree — are the merchant of
        record for the products they list.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>You must provide accurate information when creating a buyer or seller account.</li>
        <li>You are responsible for keeping your login credentials secure.</li>
        <li>
          Saloree may suspend accounts that violate these Terms or engage in fraudulent activity.
        </li>
      </ul>

      <h2>3. Orders and payments</h2>
      <p>
        Prices are set by individual sellers and displayed in the currency you select. Placing an
        order is an offer to purchase, which the seller may accept or decline. Payment is processed
        at checkout through our supported payment providers.
      </p>

      <h2>4. Seller obligations</h2>
      <ul>
        <li>List only products you are authorized to sell.</li>
        <li>Keep stock levels and shipping timelines accurate.</li>
        <li>Comply with applicable consumer protection and product safety laws.</li>
      </ul>

      <h2>5. Prohibited use</h2>
      <p>
        You may not use Saloree to list counterfeit, stolen, or illegal goods, to misrepresent a
        product's condition or origin, or to interfere with the normal operation of the platform.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        Saloree is provided on an "as is" basis. To the fullest extent permitted by law, Saloree is
        not liable for indirect or consequential damages arising from your use of the marketplace or
        from transactions between buyers and sellers.
      </p>

      <h2>7. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of Saloree after a change takes
        effect constitutes acceptance of the revised Terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a
          href="mailto:info@saloree.com"
          className="font-semibold text-[var(--color-brand)] hover:underline"
        >
          info@saloree.com
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
