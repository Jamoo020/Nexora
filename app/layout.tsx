import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AiConsultant } from "@/components/ai-consultant";

export const metadata: Metadata = {
  title: "Brentiq | Engineering Digital Experiences",
  description: "Brentiq builds premium websites, enterprise web applications, and AI automation systems for ambitious companies.",
  keywords: ["Brentiq", "software development", "AI automation", "SEO optimized websites", "premium web design"],
  openGraph: { title: "Brentiq | Engineering Digital Experiences", description: "Premium digital products and growth-focused technology for modern businesses.", type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          {children}
          <SiteFooter />
          <AiConsultant />
        </div>
      </body>
    </html>
  );
}
