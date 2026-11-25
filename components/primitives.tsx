import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { type Asset, business } from "@/lib/site";
import { whatsAppUrl } from "@/lib/whatsapp";

export function Photo({ asset, className, eager, id, sizes = "(max-width: 720px) 100vw, 50vw" }: {
  asset: Asset; className?: string; eager?: boolean; id?: string; sizes?: string;
}) {
  return <Image id={id} src={asset.src} alt={asset.alt} fill sizes={sizes} preload={eager} className={className}
    style={{ objectPosition: asset.position }} />;
}

export function Button({ href, children, kind = "primary" }: { href: string; children: ReactNode; kind?: "primary" | "secondary" | "text" }) {
  return <Link className={`button button-${kind}`} href={href}>{children}</Link>;
}

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.44L3.5 20.5l1.2-4.28A8.5 8.5 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
    <path d="M8.4 7.7c-.4 0-.9.65-.9 1.37 0 2.18 2.8 5.46 5.8 6.43.98.32 2.33-.19 2.52-1.25.04-.25.03-.43-.18-.54l-1.88-.91c-.2-.1-.35-.04-.49.12l-.65.75c-.12.13-.25.16-.48.05-1.26-.59-2.27-1.48-2.89-2.72-.1-.2-.1-.33.04-.48l.48-.56c.13-.16.15-.31.08-.49l-.7-1.5a.39.39 0 0 0-.4-.27H8.4Z" fill="currentColor" />
  </svg>;
}

export function Wordmark() {
  return <Link className="brand" href="/" aria-label={`${business.name} home`}>
    <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
    <span><strong>FERA</strong><small>FITNESS</small></span>
  </Link>;
}

export function PageIntro({ label, title, accent, description, image }: {
  label: string; title: string; accent?: string; description: string; image?: Asset;
}) {
  return <section className={`page-intro ${image ? "page-intro-image" : ""}`}>
    {image && <div className="page-intro-photo"><Photo asset={image} eager /></div>}
    <div className="container page-intro-content">
      <p className="eyebrow">{label}</p>
      <h1 className="display">{title}{accent && <><br /><span>{accent}</span></>}</h1>
      <p className="intro-copy">{description}</p>
    </div>
  </section>;
}

export function ClosingCta({ headline = "YOUR FIRST ROUND", accent = "STARTS HERE.", label = "Book your first session" }: {
  headline?: string; accent?: string; label?: string;
}) {
  return <section className="closing">
    <div className="container closing-inner">
      <h2 className="display">{headline}<br /><span>{accent}</span></h2>
      <Button href="/membership/#inquiry">{label}</Button>
    </div>
  </section>;
}

export function AskButton({ message, children }: { message: string; children: ReactNode }) {
  return <a className="button button-secondary" href={whatsAppUrl(message)} target="_blank" rel="noopener noreferrer">{children} <WhatsAppIcon size={18} /></a>;
}
