import Link from "next/link";
import { navigation, siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.7fr_0.7fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{siteConfig.name}</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">Premium technology for ambitious companies.</h2>
          <p className="mt-4 max-w-xl text-[var(--muted)]">We build digital products and growth systems that feel as polished as they perform.</p>
          <div className="mt-6 space-y-1 text-sm text-[var(--muted-strong)]">
            <div>
              <span className="font-medium text-[var(--foreground)]">Email:</span>{' '}
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-cyan-300">{siteConfig.email}</a>
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Contact Us:</span>{' '}
              <a href="tel:+254115568737" className="transition hover:text-cyan-300">+254 115568737</a>
              {' '}or{' '}
              <a href="tel:+254705005601" className="transition hover:text-cyan-300">+254 705005601</a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]">Navigate</h3>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            {navigation.map((item) => (
              <li key={item.href}><Link href={item.href} className="transition hover:text-cyan-300">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]">Legal</h3>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            <li><Link href="/privacy" className="transition hover:text-cyan-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="transition hover:text-cyan-300">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
