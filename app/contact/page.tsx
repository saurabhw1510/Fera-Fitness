import { ContactDetails } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry";
import { Button, PageIntro } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { mapEmbed, mapsLink } from "@/lib/site";

const description = "Find FERA Fitness in Thane West, get directions and ask about your first session on WhatsApp.";
export const metadata = pageMetadata("Contact & Directions | FERA FITNESS", description, "/contact/");

export default function Contact() {
  return <>
    <PageIntro label="Contact & find us" title="STEP INTO" accent="THE ARENA." description="Visit the studio in Thane West or get in touch to ask about programs, membership and trial sessions." />
    <div className="container section inquiry-layout contact-layout">
      <section className="section-copy">
        <h2 className="display section-title">FIND <span>FERA.</span></h2>
        <ContactDetails />
        <div className="actions">
          <a className="button button-secondary" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a>
          <Button href="/membership/#inquiry" kind="text">Request a trial session</Button>
        </div>
      </section>
      <section className="form-panel" id="inquiry">
        <h2 className="display">GET IN <span>TOUCH.</span></h2>
        <p>Send the team your training inquiry on WhatsApp.</p>
        <InquiryForm />
      </section>
    </div>
    <section className="container map-section" aria-label="Studio map"><iframe src={mapEmbed} title="FERA Fitness location in Thane West" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
  </>;
}
