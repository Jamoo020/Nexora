import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Privacy Policy - Brentiq",
  description: "Brentiq privacy policy placeholder.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Legal" title="Privacy Policy" description="This is a placeholder privacy policy. Please review and replace with your final policy." />
          <div className="mt-8 prose max-w-none text-muted">
            <p>Last updated: [Insert date]</p>
            <p>This Privacy Policy explains how Brentiq ("we", "our", "us") collects, uses, and discloses information when you use our website and services. This is a placeholder policy — please review and adapt it to your requirements or consult legal counsel.</p>
            <h3>1. Information We Collect</h3>
            <ul>
              <li>Information you provide: contact details, account information, messages, and any content you submit.</li>
              <li>Automatically collected data: usage data, IP address, device and browser information, cookies and similar technologies.</li>
            </ul>
            <h3>2. How We Use Information</h3>
            <ul>
              <li>To provide and maintain our services.</li>
              <li>To communicate with you (support, updates, marketing where permitted).</li>
              <li>To improve and personalize our website and services.</li>
            </ul>
            <h3>3. Cookies and Tracking</h3>
            <p>We use cookies and similar technologies for analytics, performance, and preferences. You can control cookies through your browser settings.</p>
            <h3>4. Third-Party Services</h3>
            <p>We may share data with third-party service providers (hosting, analytics, payment processors). Review their privacy policies for details.</p>
            <h3>5. Data Retention and Security</h3>
            <p>We retain personal data as long as necessary for the purposes described. We maintain reasonable security measures, but no system is completely secure.</p>
            <h3>6. Children's Privacy</h3>
            <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children.</p>
            <h3>7. Your Rights</h3>
            <p>Depending on your jurisdiction, you may have rights such as access, correction, deletion, and portability of your personal data.</p>
            <h3>8. Changes to This Policy</h3>
            <p>We may update this policy; material changes will be posted with a new effective date.</p>
            <h3>9. Contact</h3>
            <p>For questions about this policy, contact us at info@brentiq.co.ke.</p>
            <p className="mt-6 text-sm text-muted">This template is for convenience and does not constitute legal advice.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
