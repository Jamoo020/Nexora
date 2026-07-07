import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Terms of Service - Brentiq",
  description: "Brentiq terms of service placeholder.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Legal" title="Terms of Service" description="This is a placeholder Terms of Service. Please review and replace with your final terms." />
          <div className="mt-8 prose max-w-none text-muted">
            <p>Last updated: [Insert date]</p>
            <p>These Terms of Service ("Terms") govern your use of Brentiq's website and services. This is a template — please adapt it to your needs or seek legal counsel.</p>
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing or using our website, you agree to be bound by these Terms.</p>
            <h3>2. Use of Services</h3>
            <p>You agree to use the services lawfully and not to engage in prohibited conduct (fraud, abuse, or infringing activity).</p>
            <h3>3. User Content</h3>
            <p>You retain ownership of content you submit but grant Brentiq a license to use it to provide the services.</p>
            <h3>4. Intellectual Property</h3>
            <p>All site content, branding, and designs are the intellectual property of Brentiq or its licensors unless otherwise noted.</p>
            <h3>5. Payments and Refunds</h3>
            <p>If services require payment, the terms for billing and refunds will be provided at purchase or in a separate agreement.</p>
            <h3>6. Termination</h3>
            <p>We may suspend or terminate access for violations of these Terms or other policies.</p>
            <h3>7. Disclaimers and Limitation of Liability</h3>
            <p>Services are provided "as is" and Brentiq disclaims warranties to the extent permitted by law. Liability is limited to the extent allowed by applicable law.</p>
            <h3>8. Governing Law</h3>
            <p>These Terms are governed by the laws of the jurisdiction where Brentiq is registered.</p>
            <h3>9. Changes to Terms</h3>
            <p>We may update these Terms; material changes will be posted with a new effective date.</p>
            <h3>10. Contact</h3>
            <p>For questions about these Terms, contact info@brentiq.co.ke.</p>
            <p className="mt-6 text-sm text-muted">This template is for convenience and does not constitute legal advice.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
