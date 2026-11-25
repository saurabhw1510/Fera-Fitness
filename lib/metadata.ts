import type { Metadata } from "next";
import { assets, business } from "./site";

export function pageMetadata(title: string, description: string, path: string, image = assets.hero): Metadata {
  const canonical = business.canonicalOrigin ? new URL(path, business.canonicalOrigin).href : undefined;
  const socialImages = canonical ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined;
  return {
    title, description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: { siteName: business.name, title, description, url: canonical, type: "website",
      images: socialImages },
    twitter: { card: "summary_large_image", title, description, images: socialImages },
  };
}
