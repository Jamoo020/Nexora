import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AiChatbot } from "@/components/ai-chatbot";
import { AiConsultant } from "@/components/ai-consultant";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora | Engineering Digital Experiences",
  description: "Nexora builds premium websites, enterprise web applications, and AI automation systems for ambitious companies.",
  keywords: ["Nexora", "software development", "AI automation", "SEO optimized websites", "premium web design"],
  openGraph: { title: "Nexora | Engineering Digital Experiences", description: "Premium digital products and growth-focused technology for modern businesses.", type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          {children}
          <SiteFooter />
          <AiChatbot />
          <AiConsultant />
        </div>
      </body>
    </html>
  );
}
