import { Gallery } from "@/components/gallery";
import { ClosingCta, PageIntro } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { gallery } from "@/lib/site";

const description = "See real training photos from the mats and strength area at FERA Fitness.";
export const metadata = pageMetadata("Gallery | FERA FITNESS", description, "/gallery/");

export default function GalleryPage() {
  return <>
    <PageIntro label="Gallery" title="INSIDE THE" accent="FERA WORLD." description="See what training looks like on the mats and in the strength area." />
    <section className="container gallery-section" aria-label="Training photographs"><Gallery assets={gallery} /></section>
    <ClosingCta />
  </>;
}
