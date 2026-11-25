import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FightLoader } from "@/components/fight-loader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppIcon } from "@/components/primitives";
import { business } from "@/lib/site";
import { chatUrl } from "@/lib/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: business.canonicalOrigin ? new URL(business.canonicalOrigin) : undefined,
  icons: { icon: "/fera-icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-IN"><body>
    <FightLoader />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation />
    <main id="main-content">{children}</main>
    <Footer />
    <a href={chatUrl} target="_blank" rel="noopener noreferrer" className="floating-chat" aria-label="Chat with FERA Fitness on WhatsApp"><WhatsAppIcon size={27} /></a>
  </body></html>;
}
