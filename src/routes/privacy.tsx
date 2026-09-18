import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Saloree" },
      {
        name: "description",
        content: "How Saloree collects, uses, and protects your information.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="September 2026">
      <p>
        This Privacy Policy explains what information Saloree collects when you use our marketplace,
        how we use it, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Account details you provide, such as your name and email address.</li>
        <li>Order information, including shipping details needed to fulfill a purchase.</li>
        <li>
          Preferences you set on the site, such as your chosen language, currency, and delivery
          country.
        </li>
        <li>
          Basic usage data (such as pages viewed) used to keep the marketplace running reliably.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To process orders and connect you with the sellers you buy from.</li>
        <li>To operate your account, cart, and wishlist.</li>
        <li>To communicate with you about orders, security, and support requests.</li>
        <li>To keep the marketplace secure and prevent fraud.</li>
      </ul>

      <h2>3. Sharing with sellers</h2>
      <p>
        When you place an order, the information necessary to fulfill that order (such as your name
        and shipping address) is shared with the seller whose store you purchased from. Sellers may
        not use this information for purposes unrelated to your order.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We retain account and order information for as long as your account is active or as needed
        to comply with legal obligations, resolve disputes, and enforce our agreements.
      </p>

      <h2>5. Your choices</h2>
      <ul>
        <li>You can update your account details at any time.</li>
        <li>You can request a copy of, or deletion of, your personal data by contacting us.</li>
        <li>You can control cookies and local storage through your browser settings.</li>
      </ul>

      <h2>6. Security</h2>
      <p>
        We use industry-standard safeguards to protect your information, including encrypted
        connections and access controls on our systems. No method of transmission or storage is
        completely secure, and we work to continuously improve these protections.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this Privacy Policy or your data can be sent to{" "}
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
