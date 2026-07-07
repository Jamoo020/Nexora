import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";

export const metadata = {
  title: "Contact Brentiq - Software Development Kenya | Get Started",
  description: "Get in touch with Brentiq in Mombasa, Kenya. Let's discuss your digital transformation project. Call 0115568737 or email info@brentiq.co.ke",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <SectionHeading eyebrow="Contact Brentiq" title="Let's build something exceptional for your Kenyan business." description="Based in Mombasa and serving the entire Kenya market. Share your project goals, timeline, and vision. We'll respond promptly with a clear path forward." />
            <div className="mt-8 space-y-4 text-muted">
              <p>📧 {siteConfig.email}</p>
              <p>📱 {siteConfig.phone}</p>
              <p>📍 {siteConfig.address}</p>
            </div>
          </div>
          <div className="rounded-[32px] border border-theme bg-surface-soft p-8">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-strong">Business name</label>
                  <input className="w-full rounded-2xl border border-theme bg-surface px-4 py-3 text-theme" placeholder="Your company" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-strong">Email</label>
                  <input className="w-full rounded-2xl border border-theme bg-surface px-4 py-3 text-theme" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-strong">Project type</label>
                <input className="w-full rounded-2xl border border-theme bg-surface px-4 py-3 text-theme" placeholder="Website, app, automation, CRM..." />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-strong">Tell us about your goals</label>
                <textarea className="min-h-36 w-full rounded-2xl border border-theme bg-surface px-4 py-3 text-theme" placeholder="We need a premium website that drives leads and reflects our brand." />
              </div>
              <div className="flex flex-wrap gap-4">
                <button type="button" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950">Send inquiry</button>
                <Link href="/" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-theme">Back home</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
