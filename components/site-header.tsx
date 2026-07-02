"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, siteConfig } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPage = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-300">N</div>
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-[var(--foreground)]">{siteConfig.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{siteConfig.tagline}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={currentPage(item.href) ? "text-[var(--foreground)]" : "transition hover:text-cyan-300"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)] transition hover:bg-[var(--surface)] md:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <Link
            href="/contact"
            className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20 md:inline-flex"
          >
            Start a Project
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)]/95 px-6 pb-4 pt-3 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-[var(--foreground)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 transition ${currentPage(item.href) ? "bg-[var(--surface-soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
